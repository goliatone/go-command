import {
  createBuilderAuthoringRPC,
  createBuilderRPCClient,
  createBuilderRuntimeRPC,
  mountFSMUIBuilder,
  type DraftMachineDocument
} from "../src"

const initialDocument: DraftMachineDocument = {
  definition: {
    id: "orders",
    name: "Orders",
    version: "v1",
    states: [
      { name: "draft", initial: true },
      { name: "approved" },
      { name: "rejected", terminal: true }
    ],
    transitions: [
      {
        id: "approve",
        event: "approve",
        from: "draft",
        to: "approved",
        workflow: {
          nodes: [
            {
              id: "step-1",
              kind: "step",
              step: {
                action_id: "audit.log",
                async: false,
                delay: "",
                timeout: "",
                metadata: {}
              },
              next: []
            }
          ]
        }
      }
    ]
  },
  ui_schema: {
    layout: "flow",
    nodes: [],
    edges: [],
    inspector: {}
  },
  draft_state: {
    is_draft: true,
    last_saved_at: new Date().toISOString()
  }
}

const mountElement = document.getElementById("builder-root")
if (!mountElement) {
  throw new Error("missing #builder-root container")
}

const rpcClient = createBuilderRPCClient({
  endpoint: "/rpc"
})

mountFSMUIBuilder(mountElement, {
  machineId: "orders",
  initialDocument,
  runtimeRPC: createBuilderRuntimeRPC(rpcClient),
  authoringRPC: createBuilderAuthoringRPC(rpcClient)
})

