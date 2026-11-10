#!/usr/bin/env python3
"""Prove current Go export -> pinned published emitter -> existing RPC client offline."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PROVIDER = 'github.com/goliatone/go-generators'

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--tsc', type=Path, default=ROOT/'client/node_modules/typescript/bin/tsc')
    parser.add_argument('--record', type=Path, help='write successful proof evidence')
    args = parser.parse_args()
    env = dict(os.environ, GOWORK='off', GOPROXY='off', GOSUMDB='off', GOFLAGS='-mod=readonly -buildvcs=false')
    commands = []
    def run(argv, cwd=ROOT):
        result = subprocess.run([str(a) for a in argv], cwd=cwd, env=env, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        commands.append({'argv':[str(a) for a in argv], 'cwd':str(cwd), 'exitCode':result.returncode})
        if result.returncode:
            raise RuntimeError(result.stdout)
        return result.stdout
    module = json.loads(run(['go', 'list', '-m', '-json', PROVIDER]))
    if module.get('Replace') or module.get('Version') != 'v0.18.0':
        raise RuntimeError('proof requires the published R2-G provider, without replacements')
    published = json.loads(run(['go', 'mod', 'download', '-json', PROVIDER+'@'+module['Version']]))
    dependencies = run(['go', 'list', '-deps', './rpc'])
    if PROVIDER in dependencies:
        raise RuntimeError('runtime RPC imports generator tooling')
    with tempfile.TemporaryDirectory(prefix='rpc-command-proof-') as scratch:
        work = Path(scratch)
        # Keep source-relative client imports; compile the unchanged client under its
        # existing strict configuration, then consume its real declarations with
        # exact-optional/unchecked-index checks in the generated-contract consumer.
        out = work/'source/examples/rpc/tsgen/full'
        client = work/'source/client/src'
        second = work/'second'
        out.mkdir(parents=True); client.mkdir(parents=True); second.mkdir()
        for dest in [out, second]:
            run(['go', 'run', './examples/rpc/tsgen/export', '-out', dest])
        for name in ['manifest.json', 'wire.json', 'checks.json']:
            if (out/name).read_bytes() != (second/name).read_bytes() or (out/name).read_bytes() != (HERE/name).read_bytes():
                raise RuntimeError('nonrepeatable export or stale golden: '+name)
        checks = json.loads((out/'checks.json').read_text())
        if len(checks) != 10 or any(value is not True for value in checks.values()):
            raise RuntimeError('producer regressions failed')
        print('PASS: fresh current Go export twice, canonical fixtures and ten producer regressions')
        wrapper = ['go', 'run', './cmd/rpc-tsgen', '-mode', 'full', '-manifest', out/'manifest.json', '-out', out/'contracts.ts']
        run(wrapper)
        before = ((out/'contracts.ts').read_bytes(), (out/'contracts.ts').stat().st_mtime_ns)
        run(wrapper+['--check'])
        if before != ((out/'contracts.ts').read_bytes(), (out/'contracts.ts').stat().st_mtime_ns):
            raise RuntimeError('wrapper --check changed output')
        run(['go', 'run', PROVIDER+'/cmd/rpc-contract-ts', '-manifest', second/'manifest.json', '-out', second/'contracts.ts'])
        if (out/'contracts.ts').read_bytes() != (second/'contracts.ts').read_bytes() or (out/'contracts.ts').read_bytes() != (HERE/'contracts.ts').read_bytes():
            raise RuntimeError('wrapper/published emitter mismatch or stale generated golden')
        wire = json.loads((out/'wire.json').read_text())
        bindings = {'wireEdgesInput':'CommandInputs["example.wire_edges"]', 'wireEdgesRequest':'MethodRequests["example.wire_edges"]', 'wireEdgesResponse':'SuccessEnvelope<MethodOutputs["example.wire_edges"]>', 'input':'CommandInputs["example.echo"]', 'inputMin':'CommandInputs["example.echo"]', 'request':'MethodRequests["example.echo"]', 'dispatchRequest':'DispatchRequest<"example.echo">', 'dispatchInline':'SuccessEnvelope<DispatchResponse<"example.echo">>', 'dispatchQueued':'SuccessEnvelope<DispatchResponse<"example.echo">>', 'dispatchFailure':'SuccessEnvelope<DispatchResponse<"example.echo">>', 'object':'SuccessEnvelope<MethodOutputs["example.echo"]>', 'presentNull':'SuccessEnvelope<MethodOutputs["example.nullable"]>'}
        for name, method in {'presentFalse':'boolean', 'presentZero':'number', 'presentEmpty':'string', 'presentSlice':'slice', 'presentMap':'map', 'omittedFalse':'boolean', 'omittedZero':'number', 'omittedEmpty':'string', 'omittedNil':'slice', 'omittedSlice':'slice', 'omittedMap':'map'}.items():
            bindings[name] = 'SuccessEnvelope<MethodOutputs["example.'+method+'"]>'
        text = 'import type { CommandInputs, MethodRequests, MethodOutputs, DispatchRequest, DispatchResponse, SuccessEnvelope } from "./contracts";\n'
        for name, annotation in bindings.items():
            text += 'export const '+name+': '+annotation+' = '+json.dumps(wire[name], ensure_ascii=True)+';\n'
        (out/'wire.ts').write_text(text)
        for name in ['bindings.ts', 'strict.ts']: shutil.copyfile(HERE/name, out/name)
        tsc = args.tsc.resolve()
        ts_version = run(['node', tsc, '--version']).strip()
        run(['node', tsc, '--strict', '--declaration', '--target', 'ES2020', '--module', 'commonjs', '--outDir', client, ROOT/'client/src/rpc_client.ts', ROOT/'client/src/http_rpc_client.ts'])
        run(['node', tsc, '--strict', '--exactOptionalPropertyTypes', '--noUncheckedIndexedAccess', '--target', 'ES2020', '--module', 'commonjs', '--outDir', work/'js', out/'contracts.ts', out/'wire.ts', out/'bindings.ts', out/'strict.ts'])
        shutil.copyfile(HERE/'runtime.cjs', work/'js/runtime.cjs')
        print(run(['node', work/'js/runtime.cjs', out/'wire.json', client]).strip())
        files = [ROOT/'go.mod', ROOT/'go.sum', *ROOT.glob('*.go'), *ROOT.glob('runner/*.go'), *ROOT.glob('rpc/*.go'), *ROOT.glob('cmd/rpc-tsgen/*.go'), *ROOT.glob('examples/rpc/tsgen/fixture/*.go'), *ROOT.glob('examples/rpc/tsgen/export/*.go'), *HERE.glob('*'), ROOT/'client/src/rpc_client.ts', ROOT/'client/src/http_rpc_client.ts']
        record = {'status':'PASS', 'publishedProvider':published, 'producerChecks':checks, 'artifacts':{name:digest(out/name) for name in ['manifest.json','wire.json','checks.json','contracts.ts','wire.ts']}, 'sourceSHA256':{str(p.relative_to(ROOT)):digest(p) for p in sorted(files) if p.is_file()}, 'commands':commands, 'environment':{k:env[k] for k in ['GOWORK','GOPROXY','GOSUMDB','GOFLAGS']}, 'typescript':ts_version, 'go':run(['go','version']).strip(), 'node':run(['node','--version']).strip(), 'scope':'Current command exporter and compatibility CLI against published R2-G, strict generated consumer and unchanged HTTPRPCClient with injected fetch; no published R2-C or protected live HTTP claim.'}
        if args.record:
            args.record.write_text(json.dumps(record, indent=2)+'\n')
        print('PASS: published emitter parity, non-writing wrapper check, strict positive/negative TS and existing-client integration')

if __name__ == '__main__':
    main()
