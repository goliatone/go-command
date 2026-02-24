const state = {
  logs: [],
  endpoints: [],
};

function nextRequestID() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `req-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `HTTP ${response.status}`);
  }
  return payload;
}

function readActorID() {
  const value = document.getElementById("actor-id").value.trim();
  return value || "demo-user";
}

function buildMeta() {
  return {
    actorId: readActorID(),
    requestId: nextRequestID(),
    correlationId: "web-debug-demo",
  };
}

async function callRPC(method, params, label = "") {
  const request = {
    jsonrpc: "2.0",
    id: nextRequestID(),
    method,
    params,
  };

  const startedAt = performance.now();
  let responsePayload;
  try {
    responsePayload = await fetchJSON("/api/rpc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } catch (error) {
    responsePayload = {
      jsonrpc: "2.0",
      id: request.id,
      error: {
        code: -32099,
        message: "network request failed",
        data: String(error.message || error),
      },
    };
  }

  const durationMS = Math.round((performance.now() - startedAt) * 100) / 100;
  pushLog({
    when: new Date().toISOString(),
    method,
    label,
    durationMS,
    request,
    response: responsePayload,
  });

  if (responsePayload.error) {
    throw new Error(responsePayload.error.message || "RPC error");
  }

  return responsePayload.result;
}

function pushLog(entry) {
  state.logs.unshift(entry);
  if (state.logs.length > 30) {
    state.logs.length = 30;
  }
  renderTrafficLog();
}

function renderTrafficLog() {
  const container = document.getElementById("traffic-log");
  if (state.logs.length === 0) {
    container.innerHTML = '<div class="empty">No traffic yet. Trigger a command to start debugging.</div>';
    return;
  }

  container.innerHTML = state.logs
    .map((entry) => {
      const request = JSON.stringify(entry.request, null, 2);
      const response = JSON.stringify(entry.response, null, 2);
      const subtitle = entry.label ? `${entry.method} · ${entry.label}` : entry.method;
      return `
        <article class="log-item">
          <div class="log-head">
            <span>${escapeHTML(subtitle)}</span>
            <span>${escapeHTML(entry.when)} · ${entry.durationMS} ms</span>
          </div>
          <div class="log-body">
            <pre class="log-pane">${escapeHTML(request)}</pre>
            <pre class="log-pane">${escapeHTML(response)}</pre>
          </div>
        </article>
      `;
    })
    .join("");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function loadEndpoints() {
  const payload = await fetchJSON("/api/endpoints");
  state.endpoints = payload.endpoints || [];
  renderEndpoints();
}

function renderEndpoints() {
  const root = document.getElementById("endpoint-list");
  if (state.endpoints.length === 0) {
    root.innerHTML = '<div class="empty">No endpoints are registered.</div>';
    return;
  }

  root.innerHTML = state.endpoints
    .map((endpoint) => {
      const tags = Array.isArray(endpoint.tags) ? endpoint.tags.join(", ") : "-";
      const summary = endpoint.summary || "No summary";
      return `
        <div class="endpoint">
          <div class="endpoint-top">
            <span class="endpoint-name">${escapeHTML(endpoint.method)}</span>
            <span class="endpoint-kind">${escapeHTML(endpoint.handlerKind || "unknown")}</span>
          </div>
          <div class="endpoint-meta">${escapeHTML(summary)} · tags: ${escapeHTML(tags)}</div>
        </div>
      `;
    })
    .join("");
}

async function loadState() {
  const payload = await fetchJSON("/api/state");
  renderState(payload.state || {});
}

function renderState(counterState) {
  document.getElementById("counter-value").textContent = `${counterState.value ?? 0}`;
  document.getElementById("counter-actor").textContent = counterState.lastActorId || "-";
  document.getElementById("counter-updated").textContent = counterState.updatedAt
    ? new Date(counterState.updatedAt).toLocaleTimeString()
    : "-";
}

async function runIncrement() {
  const amount = Number.parseInt(document.getElementById("counter-amount").value, 10);
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;
  await callRPC(
    "counter.increment",
    {
      data: { amount: safeAmount },
      meta: buildMeta(),
    },
    `amount=${safeAmount}`,
  );
  await runSnapshot();
}

async function runReset() {
  await callRPC(
    "counter.reset",
    {
      data: {},
      meta: buildMeta(),
    },
    "reset",
  );
  await runSnapshot();
}

async function runSnapshot() {
  const result = await callRPC(
    "counter.snapshot",
    {
      data: {},
      meta: buildMeta(),
    },
    "snapshot",
  );
  renderState((result && result.data) || {});
}

async function runCustomCall() {
  const method = document.getElementById("method-name").value.trim();
  if (!method) {
    throw new Error("custom method is required");
  }

  const rawParams = document.getElementById("params-json").value.trim();
  let params = {};
  if (rawParams) {
    params = JSON.parse(rawParams);
  }

  const result = await callRPC(method, params, "custom");
  if (method === "counter.snapshot") {
    renderState((result && result.data) || {});
  }
}

async function withAction(action) {
  const buttons = Array.from(document.querySelectorAll("button"));
  buttons.forEach((button) => {
    button.disabled = true;
  });

  try {
    await action();
  } catch (error) {
    pushLog({
      when: new Date().toISOString(),
      method: "ui.error",
      label: "client",
      durationMS: 0,
      request: { message: "action failed" },
      response: { error: String(error.message || error) },
    });
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}

function wireEvents() {
  document.getElementById("btn-increment").addEventListener("click", () => withAction(runIncrement));
  document.getElementById("btn-snapshot").addEventListener("click", () => withAction(runSnapshot));
  document.getElementById("btn-reset").addEventListener("click", () => withAction(runReset));
  document.getElementById("btn-send-custom").addEventListener("click", () => withAction(runCustomCall));
}

async function bootstrap() {
  wireEvents();
  renderTrafficLog();
  await Promise.all([loadEndpoints(), loadState()]);
  await runSnapshot();
}

bootstrap().catch((error) => {
  pushLog({
    when: new Date().toISOString(),
    method: "bootstrap",
    label: "init",
    durationMS: 0,
    request: { message: "bootstrap failed" },
    response: { error: String(error.message || error) },
  });
});
