#!/usr/bin/env python3
"""Prove actual Go export, comparison, TS generation and existing RPC client offline."""
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
    parser.add_argument('--allow-local-generator', action='store_true', help='explicit source-only proof using the repository development workspace')
    parser.add_argument('--record', type=Path, help='write successful proof evidence')
    args = parser.parse_args()
    env = dict(os.environ, GOWORK='off', GOPROXY='off', GOSUMDB='off', GOFLAGS='-mod=readonly -buildvcs=false')
    if args.allow_local_generator:
        env['GOWORK'] = str(ROOT/'go.work')
        env['GOFLAGS'] = '-buildvcs=false'
    commands = []
    def run(argv, cwd=ROOT):
        result = subprocess.run([str(a) for a in argv], cwd=cwd, env=env, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        commands.append({'argv':[str(a) for a in argv], 'cwd':str(cwd), 'exitCode':result.returncode})
        if result.returncode:
            raise RuntimeError(result.stdout)
        return result.stdout
    module = json.loads(run(['go', 'list', '-m', '-json', PROVIDER]))
    if args.allow_local_generator:
        if not module.get('Main') or Path(module['Dir']).resolve() != (ROOT.parent/'go-generators').resolve():
            raise RuntimeError('local proof requires the explicit sibling generator workspace module')
        published = None
    else:
        if module.get('Replace') or not module.get('Version'):
            raise RuntimeError('proof requires a published provider without replacements')
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
        comparison = ['go', 'run', './cmd/rpc-tsgen', '-mode', 'compare', '-baseline', out/'manifest.json', '-manifest', second/'manifest.json']
        provider_comparison = ['go', 'run', PROVIDER+'/cmd/rpc-contract-ts', '-baseline', out/'manifest.json', '-manifest', second/'manifest.json']
        comparison_a = run(comparison)
        if comparison_a != run(provider_comparison) or json.loads(comparison_a)['classification'] != 'unchanged':
            raise RuntimeError('comparison wrapper/provider parity failed for fresh Go exports')
        before_files = {p: (p.read_bytes(), p.stat().st_mtime_ns) for p in [out/'manifest.json', second/'manifest.json', out/'contracts.ts']}
        changed = json.loads((second/'manifest.json').read_text())
        del changed['commands'][sorted(changed['commands'])[0]]
        changed.pop('fingerprint')
        canonical = json.dumps(changed, sort_keys=True, separators=(',', ':'), ensure_ascii=False)
        # encoding/json escapes HTML and the two Unicode line separators.
        for a,b in [('&', r'\u0026'), ('<', r'\u003c'), ('>', r'\u003e'), ('\u2028', r'\u2028'), ('\u2029', r'\u2029')]:
            canonical = canonical.replace(a,b)
        changed['fingerprint'] = 'sha256:' + hashlib.sha256(canonical.encode()).hexdigest()
        candidate = work/'removed-command.json'
        candidate.write_text(json.dumps(changed))
        comparison[-1] = candidate
        provider_comparison[-1] = candidate
        comparison_b = run(comparison)
        if comparison_b != run(provider_comparison) or json.loads(comparison_b)['classification'] != 'potentially_breaking':
            raise RuntimeError('comparison missed removed command or differs across CLIs')
        result = subprocess.run([str(x) for x in comparison+['-fail-on-breaking']], cwd=ROOT, env=env, text=True, capture_output=True)
        commands.append({'argv':[str(x) for x in comparison+['-fail-on-breaking']], 'exitCode':result.returncode, 'expectedFailure':True})
        if result.returncode == 0 or result.stdout != comparison_b:
            raise RuntimeError('comparison CI gate lost report or accepted breaking change')
        for p, state in before_files.items():
            if state != (p.read_bytes(), p.stat().st_mtime_ns):
                raise RuntimeError('comparison mutated input or generated output')
        variants = work/'variants'
        variants.mkdir()
        run(['go','run','./examples/rpc/tsgen/compare-export','-out',variants])
        directional = {}
        for name,expected in [('widen','compatible'),('narrow','potentially_breaking'),('added','additive')]:
            left, right = variants/'baseline.json', variants/(name+'.json')
            wrapper_report = run(['go','run','./cmd/rpc-tsgen','-mode','compare','-baseline',left,'-manifest',right])
            provider_report = run(['go','run',PROVIDER+'/cmd/rpc-contract-ts','-baseline',left,'-manifest',right])
            if wrapper_report != provider_report or json.loads(wrapper_report)['classification'] != expected:
                raise RuntimeError('actual Go directional comparison failed: '+name)
            directional[name] = json.loads(wrapper_report)
        print('PASS: fresh Go comparison parity, breaking-change CI gate and nonmutation')
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
        files = [ROOT/'go.mod', ROOT/'go.sum', *ROOT.glob('*.go'), *ROOT.glob('runner/*.go'), *ROOT.glob('rpc/*.go'), *ROOT.glob('cmd/rpc-tsgen/*.go'), *ROOT.glob('examples/rpc/tsgen/fixture/*.go'), *ROOT.glob('examples/rpc/tsgen/export/*.go'), *ROOT.glob('examples/rpc/tsgen/compare-export/*.go'), *HERE.glob('*'), ROOT/'client/src/rpc_client.ts', ROOT/'client/src/http_rpc_client.ts']
        record = {'status':'PASS', 'publishedProvider':published, 'selectedProvider':module, 'providerSourceSHA256':{str(p.relative_to(Path(module['Dir']))):digest(p) for pattern in ['rpccontract/*.go','cmd/rpc-contract-ts/*.go'] for p in sorted(Path(module['Dir']).glob(pattern))}, 'localProvider':args.allow_local_generator, 'developmentWorkspaceSHA256':digest(ROOT/'go.work') if args.allow_local_generator else None, 'producerChecks':checks, 'comparisons':{'unchanged':json.loads(comparison_a),'removedCommand':json.loads(comparison_b), 'actualGoVariants':directional}, 'artifacts':{name:digest(out/name) for name in ['manifest.json','wire.json','checks.json','contracts.ts','wire.ts']}, 'sourceSHA256':{str(p.relative_to(ROOT)):digest(p) for p in sorted(files) if p.is_file()}, 'commands':commands, 'environment':{k:env[k] for k in ['GOWORK','GOPROXY','GOSUMDB','GOFLAGS']}, 'typescript':ts_version, 'go':run(['go','version']).strip(), 'node':run(['node','--version']).strip(), 'scope':('Local provider candidate' if args.allow_local_generator else 'Published provider') + '; current command exporter/CLI, strict TS and existing HTTPRPCClient. No published command or protected live HTTP claim.'}
        if args.record:
            args.record.write_text(json.dumps(record, indent=2)+'\n')
        print('PASS: selected emitter parity, non-writing wrapper check, strict positive/negative TS and existing-client integration')

if __name__ == '__main__':
    main()
