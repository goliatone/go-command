const state = {
  logs: [],
  endpoints: [],
  selectedEndpoint: null,
};

const SIDEBAR_WIDTH_KEY = "rpc-debug-sidebar-width";
const SIDEBAR_MIN = 280;
const SIDEBAR_MAX = 600;

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
  let isError = false;

  try {
    responsePayload = await fetchJSON("/api/rpc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    isError = !!responsePayload.error;
  } catch (error) {
    isError = true;
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
    isError,
  });

  if (responsePayload.error) {
    throw new Error(responsePayload.error.message || "RPC error");
  }

  return responsePayload.result;
}

function pushLog(entry) {
  state.logs.unshift(entry);
  if (state.logs.length > 50) {
    state.logs.pop();
  }
  appendLogEntry(entry);
  updateLogCount();
}

function updateLogCount() {
  const countEl = document.getElementById("log-count");
  const count = state.logs.length;
  countEl.textContent = count === 1 ? "1 request" : `${count} requests`;
}

function createLogEntryHTML(entry, animate = false) {
  const request = JSON.stringify(entry.request, null, 2);
  const response = JSON.stringify(entry.response, null, 2);
  const statusClass = entry.isError ? "error" : "success";
  const statusText = entry.isError ? "Error" : "OK";

  const errorClass = entry.isError ? " error" : "";
  const animateClass = animate ? " highlight" : "";
  const itemClass = `log-item${errorClass}${animateClass}`;

  return `
    <article class="${itemClass}">
      <div class="log-head">
        <div class="log-head-left">
          <span class="log-method">${escapeHTML(entry.method)}</span>
          ${entry.label ? `<span class="log-label">${escapeHTML(entry.label)}</span>` : ""}
        </div>
        <div class="log-head-right">
          <span class="log-status ${statusClass}">${statusText}</span>
          <span class="log-meta">${entry.durationMS}ms</span>
        </div>
      </div>
      <div class="log-body">
        <div class="log-pane">
          <div class="log-pane-header">Request</div>
          <pre>${escapeHTML(request)}</pre>
        </div>
        <div class="log-pane">
          <div class="log-pane-header">Response</div>
          <pre>${escapeHTML(response)}</pre>
        </div>
      </div>
    </article>
  `;
}

function appendLogEntry(entry) {
  const container = document.getElementById("traffic-log");
  const scrollContainer = document.getElementById("log-scroll");

  // Remove empty state if present
  const empty = container.querySelector(".empty");
  if (empty) {
    empty.remove();
  }

  // Create and prepend the new entry with animation
  const temp = document.createElement("div");
  temp.innerHTML = createLogEntryHTML(entry, true);
  const newItem = temp.firstElementChild;

  container.prepend(newItem);

  // Remove highlight class after animation completes
  newItem.addEventListener("animationend", () => {
    newItem.classList.remove("highlight");
  }, { once: true });

  // Scroll to top to show the newest entry
  scrollContainer.scrollTop = 0;

  // Remove excess items from DOM if over limit
  const items = container.querySelectorAll(".log-item");
  if (items.length > 50) {
    items[items.length - 1].remove();
  }
}

function renderTrafficLog() {
  const container = document.getElementById("traffic-log");

  if (state.logs.length === 0) {
    container.innerHTML = '<div class="empty">No requests yet. Trigger a command to start.</div>';
    return;
  }

  container.innerHTML = state.logs
    .map((entry) => createLogEntryHTML(entry, false))
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
    root.innerHTML = '<div class="empty">No endpoints registered.</div>';
    return;
  }

  root.innerHTML = state.endpoints
    .map((endpoint, index) => {
      const summary = endpoint.summary || "No description";
      const isQuery = endpoint.handlerKind === "query";
      const kindClass = isQuery ? "endpoint-kind query" : "endpoint-kind";
      const activeClass = state.selectedEndpoint === index ? " active" : "";

      return `
        <div class="endpoint${activeClass}" data-index="${index}">
          <div class="endpoint-top">
            <span class="endpoint-name">${escapeHTML(endpoint.method)}</span>
            <span class="${kindClass}">${escapeHTML(endpoint.handlerKind || "command")}</span>
          </div>
          <div class="endpoint-meta">${escapeHTML(summary)}</div>
        </div>
      `;
    })
    .join("");

  root.querySelectorAll(".endpoint").forEach((el) => {
    el.addEventListener("click", () => {
      const index = parseInt(el.dataset.index, 10);
      selectEndpoint(index);
    });
  });
}

function selectEndpoint(index) {
  const endpoint = state.endpoints[index];
  if (!endpoint) return;

  state.selectedEndpoint = index;

  document.getElementById("method-name").value = endpoint.method;

  const params = {
    data: {},
    meta: {
      actorId: readActorID(),
    },
  };
  document.getElementById("params-json").value = JSON.stringify(params, null, 2);

  renderEndpoints();

  document.getElementById("method-name").focus();
}

async function loadState() {
  const payload = await fetchJSON("/api/state");
  renderState(payload.state || {}, false);
}

function renderState(counterState, animate = true) {
  const valueEl = document.getElementById("counter-value");
  const actorEl = document.getElementById("counter-actor");
  const updatedEl = document.getElementById("counter-updated");

  valueEl.textContent = `${counterState.value ?? 0}`;
  actorEl.textContent = counterState.lastActorId || "-";
  updatedEl.textContent = counterState.updatedAt
    ? new Date(counterState.updatedAt).toLocaleTimeString()
    : "-";

  if (animate) {
    flashStateItems();
  }
}

function flashStateItems() {
  const items = document.querySelectorAll(".state-item");
  items.forEach((item) => {
    item.classList.add("flash");
  });

  setTimeout(() => {
    items.forEach((item) => {
      item.classList.remove("flash");
    });
  }, 400);
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
    `+${safeAmount}`,
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
    "read",
  );
  renderState((result && result.data) || {}, true);
}

async function runCustomCall() {
  const method = document.getElementById("method-name").value.trim();
  if (!method) {
    throw new Error("Method name is required");
  }

  const rawParams = document.getElementById("params-json").value.trim();
  let params = {};
  if (rawParams) {
    try {
      params = JSON.parse(rawParams);
    } catch (e) {
      throw new Error(`Invalid JSON: ${e.message}`);
    }
  }

  const result = await callRPC(method, params, "custom");
  if (method === "counter.snapshot") {
    renderState((result && result.data) || {}, true);
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
      method: "client.error",
      label: "error",
      durationMS: 0,
      request: { action: "failed" },
      response: { error: { message: String(error.message || error) } },
      isError: true,
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

function initResize() {
  const sidebar = document.getElementById("sidebar");
  const handle = document.getElementById("resize-handle");

  if (!sidebar || !handle) return;

  // Restore saved width
  const savedWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY);
  if (savedWidth) {
    const width = parseInt(savedWidth, 10);
    if (width >= SIDEBAR_MIN && width <= SIDEBAR_MAX) {
      sidebar.style.width = `${width}px`;
    }
  }

  let isDragging = false;
  let startX = 0;
  let startWidth = 0;

  function onMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    startWidth = sidebar.offsetWidth;

    document.body.classList.add("resizing");
    handle.classList.add("dragging");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.preventDefault();
  }

  function onMouseMove(e) {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    let newWidth = startWidth + delta;

    // Clamp to min/max
    newWidth = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, newWidth));

    sidebar.style.width = `${newWidth}px`;
  }

  function onMouseUp() {
    if (!isDragging) return;

    isDragging = false;
    document.body.classList.remove("resizing");
    handle.classList.remove("dragging");

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    // Save width to localStorage
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebar.offsetWidth.toString());
  }

  handle.addEventListener("mousedown", onMouseDown);
}

async function bootstrap() {
  wireEvents();
  initResize();
  renderTrafficLog();
  updateLogCount();
  await Promise.all([loadEndpoints(), loadState()]);
  await runSnapshot();
}

bootstrap().catch((error) => {
  pushLog({
    when: new Date().toISOString(),
    method: "bootstrap",
    label: "init",
    durationMS: 0,
    request: { action: "initialize" },
    response: { error: { message: String(error.message || error) } },
    isError: true,
  });
});
