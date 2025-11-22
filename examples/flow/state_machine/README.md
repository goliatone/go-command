# State Machine Example - Order Workflow

This example demonstrates the `flow.StateMachine` with a web UI for interactive exploration.

## Overview

The example implements an order processing workflow with the following states:

- **draft** (initial state) - Order is being created
- **approved** - Order has been approved for processing
- **fulfilled** (terminal) - Order has been completed
- **cancelled** (terminal) - Order has been cancelled

## State Transitions

```
draft --[approve]--> approved --[fulfill]--> fulfilled
  |                      |
  |--[cancel]--------    |--[cancel]---------> cancelled
```

### Guarded Transitions

Some transitions require admin privileges (🔒 guard):
- `approve`: draft → approved (requires `is_admin` guard)
- `cancel`: approved → cancelled (requires `is_admin` guard)

### Actions

Transitions can trigger actions (⚡):
- `approve` triggers `audit` action - logs admin approval
- `fulfill` triggers `log_fulfillment` action - logs fulfillment

## Running the Example

```bash
cd examples/flow/state_machine
go run .
```

Then open http://localhost:8080 in your browser.

## How to Use

1. **Create an order**: Click "Create New Order" - it starts in "draft" state
2. **Toggle Admin Mode**: Enable/disable to see how guards affect available transitions
3. **Execute transitions**: Click the transition buttons to move orders through states
4. **Watch the audit log**: See actions being triggered as you transition

### Example Flow (Non-Admin)

1. Create an order → draft state
2. Try to approve → No "approve" button (requires admin)
3. Cancel the order → cancelled state ✓

### Example Flow (Admin)

1. Enable Admin Mode
2. Create an order → draft state
3. Approve the order → approved state ✓ (audit action logs this)
4. Fulfill the order → fulfilled state ✓ (fulfillment action logs this)

## Key Concepts Demonstrated

- **State Machine Configuration**: Defining states and transitions declaratively
- **Guards**: Conditional transitions based on message properties
- **Actions**: Side effects triggered during transitions
- **State Persistence**: Using an in-memory state store
- **Message-Driven Transitions**: OrderMsg drives state changes
- **Normalization**: States and events are normalized to lowercase internally
