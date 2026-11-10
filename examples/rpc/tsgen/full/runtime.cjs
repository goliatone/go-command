const assert = require('node:assert/strict');
const fs = require('node:fs');
const { bindContracts } = require('./bindings.js');
const { HTTPRPCClient } = require(process.argv[3] + '/http_rpc_client.js');
const { RPCClientError } = require(process.argv[3] + '/rpc_client.js');
const wire = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

async function main() {
  const requests = [];
  let response;
  let status = 200;
  const client = new HTTPRPCClient({
    endpoint: 'https://example.invalid/rpc', rpcVersion: '2.0', idGenerator: () => 'fixture-id',
    fetchImpl: async (url, init) => {
      assert.equal(url, 'https://example.invalid/rpc');
      assert.equal(init.method, 'POST');
      assert.equal(init.headers['content-type'], 'application/json');
      const request = JSON.parse(init.body);
      assert.equal(request.jsonrpc, '2.0');
      assert.equal(request.id, 'fixture-id');
      requests.push(request);
      return { ok: status < 400, status, json: async () => response };
    }
  });
  const { call, dispatch } = bindContracts(client, 'host.commands.dispatch');
  const expected = wire.dispatchRequest;
  response = { result: wire.dispatchInline };
  const result = await dispatch(expected.data.command_id, expected.data.payload, { ids: expected.data.ids, options: expected.data.options, meta: expected.meta });
  assert.equal(requests.length, 1);
  assert.equal(requests[0].method, 'host.commands.dispatch');
  // The canonical fixture includes a legacy name to prove command_id precedence.
  // The typed helper intentionally sends only the explicit command ID.
  const { name: legacyName, ...typedPayload } = expected.data;
  assert.equal(legacyName, "legacy.ignored");
  assert.deepEqual(requests[0].params, { ...expected, data: typedPayload });
  assert.equal(Object.hasOwn(requests[0].params.data, 'name'), false);
  assert.strictEqual(result, wire.dispatchInline);
  assert.equal(result.data.receipt.Accepted, true);
  assert.equal(result.data.receipt.CommandID, 'example.echo');
  assert.equal(result.data.result.value, false);
  assert.equal(result.data.result.count, 0);
  assert.equal(result.data.result.text, '');
  assert.equal(result.data.result.data, 'application data');
  assert.equal(result.data.result.result, 'application result');
  for (const name of ['dispatchQueued', 'dispatchFailure']) {
    response = { result: wire[name] };
    assert.strictEqual(await dispatch('example.echo', wire.input), wire[name]);
    assert.deepEqual(requests.at(-1).params, { data: { command_id: 'example.echo', payload: wire.input } });
  }
  assert.equal(Object.hasOwn(wire.dispatchQueued.data, 'result'), false);
  assert.equal(wire.dispatchQueued.data.receipt.Mode, 'queued');
  assert.equal(wire.dispatchQueued.data.status_reference, '/status/dispatch-1');
  assert.equal(wire.dispatchFailure.data.receipt.Accepted, false);
  assert.equal(wire.dispatchFailure.data.validation_errors[0].path, 'count');
  response = { result: wire.dispatchQueued };
  await dispatch('example.echo', wire.input, { options: { Mode: 'queued' } });
  assert.deepEqual(requests.at(-1).params.data.options, { Mode: 'queued' });
  const present = { presentNull: ['nullable', null], presentFalse: ['boolean', false], presentZero: ['number', 0], presentEmpty: ['string', ''], presentSlice: ['slice', []], presentMap: ['map', {}] };
  const absent = { omittedFalse: 'boolean', omittedZero: 'number', omittedEmpty: 'string', omittedNil: 'slice', omittedSlice: 'slice', omittedMap: 'map' };
  for (const [name, suffix] of Object.entries(absent)) {
    response = { result: wire[name] };
    const before = requests.length;
    const result = await call('example.' + suffix, wire.input);
    assert.equal(requests.length, before + 1);
    assert.equal(requests.at(-1).method, 'example.' + suffix);
    assert.deepEqual(requests.at(-1).params, wire.request);
    assert.strictEqual(result, wire[name]);
    assert.equal(Object.hasOwn(result, 'data'), false);
  }
  for (const [name, [suffix, value]] of Object.entries(present)) {
    response = { result: wire[name] };
    const result = await call('example.' + suffix, wire.input);
    assert.strictEqual(result, wire[name]);
    assert.equal(Object.hasOwn(result, 'data'), true);
    assert.deepEqual(result.data, value);
  }
  response = { result: wire.wireEdgesResponse };
  const edges = await call('example.wire_edges', wire.wireEdgesInput);
  assert.deepEqual(requests.at(-1).params, wire.wireEdgesRequest);
  assert.strictEqual(edges, wire.wireEdgesResponse);
  assert.equal(edges.data['-'], 7);
  assert.equal(edges.data.number, '9007199254740993');
  assert.equal(Object.hasOwn(edges.data, 'Ignored'), false);
  response = { result: wire.object };
  assert.strictEqual(await call('example.echo', wire.input, { requestId: 'host' }), wire.object);
  assert.deepEqual(requests.at(-1).params.meta, { requestId: 'host' });
  assert.equal(wire.input.count, Number.MAX_SAFE_INTEGER);
  assert.equal(wire.inputMin.count, Number.MIN_SAFE_INTEGER);
  assert.equal(wire.input.wide, '18446744073709551615');
  // The existing dynamic client path remains available, including the legacy name alias.
  await client.call('host.commands.dispatch', { data: { name: 'legacy.dynamic', payload: {} } });
  assert.equal(requests.at(-1).params.data.name, 'legacy.dynamic');
  for (status of [200, 403]) {
    response = wire.error;
    for (const invoke of [() => call('example.echo', wire.input), () => dispatch('example.echo', wire.input)]) {
      const before = requests.length;
      await assert.rejects(invoke, error => {
        assert.ok(error instanceof RPCClientError);
        for (const field of ['code', 'message', 'category', 'retryable', 'details']) assert.deepEqual(error[field], wire.error.error[field]);
        assert.equal(error.status, status === 403 ? 403 : undefined);
        return true;
      });
      assert.equal(requests.length, before + 1);
    }
  }
  console.log('PASS: existing HTTPRPCClient preserves actual-Go envelopes, dispatch fields, absent/null/falsy/domain data, dynamic calls and phase-1 errors');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
