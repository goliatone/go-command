# FSM UI Builder Web Chat Example

Runnable example that hosts the FSM UI Builder in a web UI and adds deterministic chat automation commands over RPC, including scenario controls and a mechanics inspector panel.

## What this example demonstrates

- Fiber server through `go-router`
- RPC transport mounted by `rpcfiber` at:
  - `POST /api/rpc`
  - `GET /api/rpc/endpoints`
- FSM runtime + authoring RPC families (`fsm.*`, `fsm.authoring.*`)
- Example-only bot RPC namespace:
  - `bot.chat.send`
  - `bot.chat.history`
  - `bot.chat.clear`
- UI composition: builder panel + command console in one host page
- Scenario controls for machine/entity/event/amount + optional preconditions
- Guided playbooks (`quickstart`, `manual-review`, `conflict-check`)
- Mechanics inspector that shows structured command results (`apply_event`, `snapshot`, diagnostics, errors)
- Serves built client package assets for local testing:
  - `/builder/*` -> `fsm-ui-builder`
  - `/client/fsm/*` -> `fsm`

## Run

From this directory:

```bash
/Users/goliatone/.g/go/bin/go mod tidy
/Users/goliatone/.g/go/bin/go run .
```

Then open: `http://localhost:8185`

If builder assets are missing/stale, run from repo root:

```bash
./taskfile client:build:example:fsm_ui_builder_web_chat
```

To build artifacts and run the example in one command:

```bash
./taskfile example:fsm_ui_builder_web_chat:run
```

## Chat commands

Use these in the right-side chat panel:

- `/help`
- `/validate`
- `/publish`
- `/status order-1 amount=120`
- `/simulate approve order-1 amount=120`
- `/apply approve order-1 amount=120`
- `/add-transition approved escalate escalated`
- `/list-machines`
- `/playbook`

Command options:

- `/simulate <event> <entityId> [amount=<float>] [dryRun=true|false] [expectedState=<state>] [expectedVersion=<int>] [idempotency=<key>]`
- `/apply <event> <entityId> [amount=<float>] [expectedState=<state>] [expectedVersion=<int>] [idempotency=<key>]`
- `/status <entityId> [amount=<float>]`

## cURL examples

Validate draft:

```bash
curl -s http://localhost:8185/api/rpc \
  -H 'content-type: application/json' \
  -d '{"method":"fsm.authoring.validate","params":{"data":{"machineId":"orders"}}}'
```

Simulate dry-run:

```bash
curl -s http://localhost:8185/api/rpc \
  -H 'content-type: application/json' \
  -d '{"method":"fsm.apply_event","params":{"data":{"machineId":"orders","entityId":"order-1","event":"approve","msg":{"entityId":"order-1","event":"approve","amount":120},"dryRun":true}}}'
```

Send chat command:

```bash
curl -s http://localhost:8185/api/rpc \
  -H 'content-type: application/json' \
  -d '{"method":"bot.chat.send","params":{"data":{"machineId":"orders","message":"/help"}}}'
```

## Notes

- Builder package defaults to `POST /rpc`; this example intentionally overrides client endpoint to `POST /api/rpc`.
- The host mounts `FSMUIBuilder` with a shared `rpcClient` targeting `/api/rpc` so runtime (`fsm.*`) and authoring (`fsm.authoring.*`) adapters are auto-wired from one endpoint.
- Chat behavior is deterministic/rule-based (no external LLM dependency).
