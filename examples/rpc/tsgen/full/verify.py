#!/usr/bin/env python3
"""Prove actual Go export, comparison, TS generation and existing RPC client offline."""
import argparse
import hashlib
import copy
import time
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

def write_manifest(path, manifest):
    manifest = copy.deepcopy(manifest)
    manifest.pop('fingerprint', None)
    canonical = json.dumps(manifest, sort_keys=True, separators=(',', ':'), ensure_ascii=False)
    for a,b in [('&', r'\u0026'), ('<', r'\u003c'), ('>', r'\u003e'), ('\u2028', r'\u2028'), ('\u2029', r'\u2029')]:
        canonical = canonical.replace(a,b)
    manifest['fingerprint'] = 'sha256:' + hashlib.sha256(canonical.encode()).hexdigest()
    path.write_text(json.dumps(manifest))
    return path

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
        candidate = write_manifest(work/'removed-command.json', changed)
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
        # Exercise the release-review regressions through the real CLI binaries.
        # Building first keeps the runtime bound independent of Go compile time.
        binaries = [work/'wrapper-compare', work/'provider-compare']
        run(['go','build','-o',binaries[0],'./cmd/rpc-tsgen'])
        run(['go','build','-o',binaries[1],PROVIDER+'/cmd/rpc-contract-ts'])
        blocker_regressions = {}
        def compare_pair(label, left, right, expected):
            snapshots = {p:(p.read_bytes(),p.stat().st_mtime_ns) for p in [left,right]}
            reports = []
            for i,binary in enumerate(binaries):
                argv = [binary] + (['-mode','compare'] if i == 0 else []) + ['-baseline',left,'-manifest',right,'-fail-on-breaking']
                start = time.monotonic()
                result = subprocess.run([str(x) for x in argv], cwd=ROOT, env=env, text=True, capture_output=True, timeout=5)
                commands.append({'argv':[str(x) for x in argv], 'exitCode':result.returncode, 'expectedFailure':expected=='potentially_breaking', 'seconds':round(time.monotonic()-start,4)})
                if result.returncode != (1 if expected=='potentially_breaking' else 0):
                    raise RuntimeError('comparison regression exit: '+label+' '+result.stderr)
                report = json.loads(result.stdout)
                if report['classification'] != expected:
                    raise RuntimeError('comparison regression classification: '+label)
                reports.append(result.stdout)
            if reports[0] != reports[1]:
                raise RuntimeError('comparison regression CLI mismatch: '+label)
            for p,state in snapshots.items():
                if state != (p.read_bytes(),p.stat().st_mtime_ns):
                    raise RuntimeError('comparison regression mutated input: '+label)
            blocker_regressions[label] = json.loads(reports[0])
            return blocker_regressions[label]

        fresh = json.loads((out/'manifest.json').read_text())
        custom = copy.deepcopy(fresh)
        custom['definitions']['reviewLeaf'] = {'kind':'string'}
        custom['definitions']['reviewAlias'] = {'kind':'ref','ref':'reviewLeaf'}
        custom['canonical']['CustomContract'] = {'kind':'ref','ref':'reviewAlias'}
        left = write_manifest(work/'custom-before.json',custom)
        custom['definitions']['reviewLeaf'] = {'kind':'integer','minimum':0,'maximum':10}
        right = write_manifest(work/'custom-after.json',custom)
        report = compare_pair('unknownCanonicalReference',left,right,'potentially_breaking')
        if not any(c['code']=='canonical_changed' and c['direction']=='unknown' for c in report['changes']):
            raise RuntimeError('unknown canonical change was not identified')

        dag = copy.deepcopy(fresh)
        dag['definitions']['reviewLeaf'] = {'kind':'integer','minimum':0,'maximum':10}
        ref = {'kind':'ref','ref':'reviewLeaf'}
        for i in range(28):
            name = 'reviewNode'+str(i)
            dag['definitions'][name] = {'kind':'object','properties':{k:{'schema':ref,'required':True} for k in ['left','right']}}
            ref = {'kind':'ref','ref':name}
        dag['commands']['review.shared'] = {'input':ref,'result':ref,'resultMode':'optional'}
        left = write_manifest(work/'dag-before.json',dag)
        compare_pair('sharedGraphUnchanged',left,left,'unchanged')
        dag['commands']['review.shared']['summary'] = 'Documentation change only'
        right = write_manifest(work/'dag-meta.json',dag)
        compare_pair('sharedGraphMetadata',left,right,'compatible')
        del dag['commands']['review.shared']['summary']
        dag['definitions']['reviewLeaf']['maximum'] = 20
        right = write_manifest(work/'dag-changed.json',dag)
        report = compare_pair('sharedGraphChanged',left,right,'potentially_breaking')
        if len(report['changes']) != 2 or {c['direction']:c['classification'] for c in report['changes']} != {'request':'compatible','response':'potentially_breaking'}:
            raise RuntimeError('shared graph findings are unbounded or conflate directions')
        print('PASS: both blocker regressions through both CLIs; bounded shared graphs and nonmutation')
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
        record = {'status':'PASS', 'publishedProvider':published, 'selectedProvider':module, 'providerSourceSHA256':{str(p.relative_to(Path(module['Dir']))):digest(p) for pattern in ['rpccontract/*.go','cmd/rpc-contract-ts/*.go'] for p in sorted(Path(module['Dir']).glob(pattern))}, 'localProvider':args.allow_local_generator, 'developmentWorkspaceSHA256':digest(ROOT/'go.work') if args.allow_local_generator else None, 'producerChecks':checks, 'comparisons':{'unchanged':json.loads(comparison_a),'removedCommand':json.loads(comparison_b), 'actualGoVariants':directional, 'blockerRegressions':blocker_regressions}, 'artifacts':{name:digest(out/name) for name in ['manifest.json','wire.json','checks.json','contracts.ts','wire.ts']}, 'sourceSHA256':{str(p.relative_to(ROOT)):digest(p) for p in sorted(files) if p.is_file()}, 'commands':commands, 'environment':{k:env[k] for k in ['GOWORK','GOPROXY','GOSUMDB','GOFLAGS']}, 'typescript':ts_version, 'go':run(['go','version']).strip(), 'node':run(['node','--version']).strip(), 'scope':('Local provider candidate' if args.allow_local_generator else 'Published provider') + '; current command exporter/CLI, strict TS and existing HTTPRPCClient. No published command or protected live HTTP claim.'}
        if args.record:
            args.record.write_text(json.dumps(record, indent=2)+'\n')
        print('PASS: selected emitter parity, non-writing wrapper check, strict positive/negative TS and existing-client integration')

if __name__ == '__main__':
    main()
