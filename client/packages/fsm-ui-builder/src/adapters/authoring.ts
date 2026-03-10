import { useMemo } from "react"
import type { RPCClient } from "../../../../src"

import {
  FSM_AUTHORING_METHODS,
  type AuthoringDeleteMachineRequest,
  type AuthoringDeleteMachineResponse,
  type AuthoringGetMachineRequest,
  type AuthoringGetMachineResponse,
  type AuthoringListMachinesRequest,
  type AuthoringListMachinesResponse,
  type AuthoringPublishRequest,
  type AuthoringPublishResponse,
  type AuthoringSaveDraftRequest,
  type AuthoringSaveDraftResponse,
  type AuthoringValidateRequest,
  type AuthoringValidateResponse,
  type BuilderRequestMeta
} from "../contracts"
import { callBuilderMethod } from "../rpc"

export interface BuilderAuthoringRPC {
  listMachines(data: AuthoringListMachinesRequest, meta?: BuilderRequestMeta): Promise<AuthoringListMachinesResponse>
  getMachine(data: AuthoringGetMachineRequest, meta?: BuilderRequestMeta): Promise<AuthoringGetMachineResponse>
  saveDraft(data: AuthoringSaveDraftRequest, meta?: BuilderRequestMeta): Promise<AuthoringSaveDraftResponse>
  validate(data: AuthoringValidateRequest, meta?: BuilderRequestMeta): Promise<AuthoringValidateResponse>
  publish(data: AuthoringPublishRequest, meta?: BuilderRequestMeta): Promise<AuthoringPublishResponse>
  deleteMachine(data: AuthoringDeleteMachineRequest, meta?: BuilderRequestMeta): Promise<AuthoringDeleteMachineResponse>
}

export function createBuilderAuthoringRPC(client: RPCClient): BuilderAuthoringRPC {
  return {
    async listMachines(data, meta) {
      return callBuilderMethod<AuthoringListMachinesRequest, AuthoringListMachinesResponse>({
        client,
        method: FSM_AUTHORING_METHODS.listMachines,
        data,
        meta
      })
    },
    async getMachine(data, meta) {
      return callBuilderMethod<AuthoringGetMachineRequest, AuthoringGetMachineResponse>({
        client,
        method: FSM_AUTHORING_METHODS.getMachine,
        data,
        meta
      })
    },
    async saveDraft(data, meta) {
      return callBuilderMethod<AuthoringSaveDraftRequest, AuthoringSaveDraftResponse>({
        client,
        method: FSM_AUTHORING_METHODS.saveDraft,
        data,
        meta
      })
    },
    async validate(data, meta) {
      return callBuilderMethod<AuthoringValidateRequest, AuthoringValidateResponse>({
        client,
        method: FSM_AUTHORING_METHODS.validate,
        data,
        meta
      })
    },
    async publish(data, meta) {
      return callBuilderMethod<AuthoringPublishRequest, AuthoringPublishResponse>({
        client,
        method: FSM_AUTHORING_METHODS.publish,
        data,
        meta
      })
    },
    async deleteMachine(data, meta) {
      return callBuilderMethod<AuthoringDeleteMachineRequest, AuthoringDeleteMachineResponse>({
        client,
        method: FSM_AUTHORING_METHODS.deleteMachine,
        data,
        meta
      })
    }
  }
}

export function useAuthoringRPC(client: RPCClient | null): BuilderAuthoringRPC | null {
  return useMemo(() => {
    if (!client) {
      return null
    }
    return createBuilderAuthoringRPC(client)
  }, [client])
}
