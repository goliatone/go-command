import { RPCClientError } from "../../../src/rpc_client"

import { HANDLED_ERROR_CODES, type HandledErrorCode } from "./contracts"
import { BuilderResultError } from "./rpc"

export interface HandledBuilderError {
  code: HandledErrorCode
  message: string
  method?: string
}

const HANDLED_CODE_SET = new Set<string>(Object.values(HANDLED_ERROR_CODES))

function normalizeHandledCode(value: unknown): HandledErrorCode {
  if (typeof value === "string" && HANDLED_CODE_SET.has(value)) {
    return value as HandledErrorCode
  }
  return HANDLED_ERROR_CODES.internal
}

function normalizeMessage(input: unknown): string {
  if (typeof input === "string" && input.trim() !== "") {
    return input
  }
  return "internal error"
}

function toRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function asError(input: unknown): Error | null {
  return input instanceof Error ? input : null
}

export function toHandledBuilderError(error: unknown): HandledBuilderError {
  if (error instanceof BuilderResultError) {
    return {
      code: normalizeHandledCode(error.envelope.code),
      message: normalizeMessage(error.envelope.message),
      method: error.method
    }
  }

  if (error instanceof RPCClientError) {
    return {
      code: normalizeHandledCode(error.code),
      message: normalizeMessage(error.message),
      method: error.method
    }
  }

  const record = toRecord(error)
  if (record) {
    return {
      code: normalizeHandledCode(record.code),
      message: normalizeMessage(record.message),
      method: typeof record.method === "string" ? record.method : undefined
    }
  }

  const asNativeError = asError(error)
  if (asNativeError) {
    return {
      code: HANDLED_ERROR_CODES.internal,
      message: normalizeMessage(asNativeError.message)
    }
  }

  return {
    code: HANDLED_ERROR_CODES.internal,
    message: "internal error"
  }
}

export function formatHandledBuilderError(error: HandledBuilderError): string {
  const prefix = error.method ? `${error.method}: ` : ""
  return `${prefix}[${error.code}] ${error.message}`
}
