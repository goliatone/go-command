import { useEffect, useMemo, useState } from "react"

import { InlineDiagnostics } from "./shared"

function metadataToText(metadata: Record<string, unknown> | undefined): string {
  return JSON.stringify(metadata ?? {}, null, 2)
}

function parseMetadataText(raw: string): { value?: Record<string, unknown>; error?: string } {
  if (raw.trim() === "") {
    return { value: {} }
  }
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { error: "metadata must be a JSON object" }
    }
    return { value: parsed as Record<string, unknown> }
  } catch (error) {
    if (error instanceof SyntaxError && error.message.trim() !== "") {
      return { error: `metadata must be valid JSON: ${error.message}` }
    }
    return { error: "metadata must be valid JSON" }
  }
}

export interface MetadataEditorProps {
  metadata: Record<string, unknown> | undefined
  onCommit: (metadata: Record<string, unknown>) => void
  readOnly?: boolean
}

export function MetadataEditor(props: MetadataEditorProps) {
  const serializedMetadata = useMemo(() => metadataToText(props.metadata), [props.metadata])
  const [text, setText] = useState(serializedMetadata)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setText(serializedMetadata)
    setError(null)
  }, [serializedMetadata])

  const commit = () => {
    if (props.readOnly) {
      return
    }
    const result = parseMetadataText(text)
    if (result.error) {
      setError(result.error)
      return
    }
    setError(null)
    props.onCommit(result.value ?? {})
  }

  return (
    <label className="fub-field">
      <span>Metadata (JSON object)</span>
      <textarea
        aria-label="Workflow metadata"
        className="fub-input fub-textarea"
        value={text}
        readOnly={Boolean(props.readOnly)}
        onChange={(event) => setText(event.target.value)}
        onBlur={commit}
      />
      {error ? <InlineDiagnostics messages={[error]} /> : null}
    </label>
  )
}
