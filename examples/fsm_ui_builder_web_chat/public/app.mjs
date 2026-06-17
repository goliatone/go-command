import {
  createBuilderRPCClient,
  mountFSMUIBuilder,
} from "/builder/index.js";

const SESSION_STORAGE_KEY = "fsm-ui-builder-web-chat.session-id";

const statusEl = document.getElementById("chat-status");
const logEl = document.getElementById("chat-log");
const suggestionsEl = document.getElementById("chat-suggestions");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("chat-input");
const clearBtnEl = document.getElementById("chat-clear");

const machineSelectEl = document.getElementById("scenario-machine");
const entityInputEl = document.getElementById("scenario-entity");
const eventInputEl = document.getElementById("scenario-event");
const amountInputEl = document.getElementById("scenario-amount");
const expectedStateInputEl = document.getElementById("scenario-expected-state");
const expectedVersionInputEl = document.getElementById("scenario-expected-version");
const idempotencyInputEl = document.getElementById("scenario-idempotency");
const simulateBtnEl = document.getElementById("scenario-simulate");
const applyBtnEl = document.getElementById("scenario-apply");

const resultSummaryEl = document.getElementById("result-summary");
const resultJsonEl = document.getElementById("result-json");
const resultCopyEl = document.getElementById("result-copy");

let sessionId = "";
let machineId = "orders";

const rpcClient = createBuilderRPCClient({ endpoint: "/api/rpc" });

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function setStatus(text, state = "connected") {
  statusEl.textContent = text;
  statusEl.className = `chat-status ${state}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = String(text ?? "");
  return div.innerHTML;
}

function appendLog(role, message, isError = false) {
  const item = document.createElement("div");
  item.className = `chat-message ${role}${isError ? " error" : ""}`;

  const isUser = role === "user";
  const label = isUser ? "You" : "Bot";
  const avatar = isUser ? "U" : "B";

  item.innerHTML = `
    <div class="chat-message-header">
      <div class="chat-message-avatar">${avatar}</div>
      <span class="chat-message-sender">${label}</span>
      <span class="chat-message-time">${formatTime()}</span>
    </div>
    <div class="chat-message-content">${escapeHtml(message)}</div>
  `;

  logEl.appendChild(item);
  logEl.scrollTop = logEl.scrollHeight;
}

function clearChatLog() {
  logEl.innerHTML = "";
}

function renderSuggestions(suggestions = []) {
  suggestionsEl.innerHTML = "";
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return;
  }

  const title = document.createElement("div");
  title.className = "suggestions-title";
  title.textContent = "Suggestions";
  suggestionsEl.appendChild(title);

  const row = document.createElement("div");
  row.className = "suggestions-row";
  for (const suggestion of suggestions) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "suggestion-btn";
    btn.dataset.command = suggestion.command;
    btn.textContent = suggestion.label;
    row.appendChild(btn);
  }
  suggestionsEl.appendChild(row);
}

function lowerCaseKeyLookup(obj, key) {
  if (!obj || typeof obj !== "object") {
    return undefined;
  }
  const found = Object.keys(obj).find((current) => current.toLowerCase() === String(key).toLowerCase());
  if (!found) {
    return undefined;
  }
  return obj[found];
}

function renderResult(result) {
  if (!result || typeof result !== "object") {
    resultSummaryEl.innerHTML = '<span class="result-empty">Run a command to inspect mechanics.</span>';
    resultJsonEl.textContent = "{}";
    return;
  }

  const applyEvent = lowerCaseKeyLookup(result, "applyEvent");
  const snapshot = lowerCaseKeyLookup(result, "snapshot");
  const inputs = lowerCaseKeyLookup(result, "inputs");
  const diagnostics = lowerCaseKeyLookup(result, "diagnostics");
  const error = lowerCaseKeyLookup(result, "error");

  const summaryItems = [];

  if (inputs && typeof inputs === "object") {
    const event = lowerCaseKeyLookup(inputs, "event");
    const entityId = lowerCaseKeyLookup(inputs, "entityId");
    const amount = lowerCaseKeyLookup(inputs, "amount");
    const dryRun = lowerCaseKeyLookup(inputs, "dryRun");
    if (event) {
      summaryItems.push(["Event", event]);
    }
    if (entityId) {
      summaryItems.push(["Entity", entityId]);
    }
    if (amount !== undefined) {
      summaryItems.push(["Amount", amount]);
    }
    if (dryRun !== undefined) {
      summaryItems.push(["Dry-Run", dryRun ? "true" : "false"]);
    }
  }

  if (applyEvent && typeof applyEvent === "object") {
    const version = lowerCaseKeyLookup(applyEvent, "version");
    const idempotencyHit = lowerCaseKeyLookup(applyEvent, "idempotencyHit");
    const transition = lowerCaseKeyLookup(applyEvent, "transition");
    const execution = lowerCaseKeyLookup(applyEvent, "execution");
    if (version !== undefined) {
      summaryItems.push(["Version", version]);
    }
    if (idempotencyHit !== undefined) {
      summaryItems.push(["Idempotency", idempotencyHit ? "hit" : "miss"]);
    }
    if (transition && typeof transition === "object") {
      const previous = lowerCaseKeyLookup(transition, "previousState");
      const current = lowerCaseKeyLookup(transition, "currentState");
      if (previous || current) {
        summaryItems.push(["State", `${previous || "?"} -> ${current || "?"}`]);
      }
    }
    if (execution && typeof execution === "object") {
      const status = lowerCaseKeyLookup(execution, "status");
      if (status) {
        summaryItems.push(["Execution", status]);
      }
    }
  }

  if (snapshot && typeof snapshot === "object") {
    const currentState = lowerCaseKeyLookup(snapshot, "currentState");
    const transitions = lowerCaseKeyLookup(snapshot, "allowedTransitions");
    if (currentState) {
      summaryItems.push(["Snapshot", currentState]);
    }
    if (Array.isArray(transitions)) {
      const blocked = transitions.filter((item) => !Boolean(lowerCaseKeyLookup(item, "allowed"))).length;
      const allowed = transitions.length - blocked;
      summaryItems.push(["Transitions", `${allowed} allowed / ${blocked} blocked`]);
    }
  }

  if (Array.isArray(diagnostics)) {
    summaryItems.push(["Diagnostics", diagnostics.length]);
  }
  if (error && typeof error === "object") {
    const code = lowerCaseKeyLookup(error, "code");
    if (code) {
      summaryItems.push(["Error", code]);
    }
  }

  if (summaryItems.length === 0) {
    resultSummaryEl.innerHTML = '<span class="result-empty">No structured mechanics found for this command.</span>';
  } else {
    resultSummaryEl.innerHTML = summaryItems
      .map(([label, value]) => `<div class="result-chip"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
      .join("");
  }

  resultJsonEl.textContent = JSON.stringify(result, null, 2);
}

function normalizedMachineId() {
  const selected = String(machineSelectEl?.value || "").trim();
  if (selected) {
    return selected;
  }
  return machineId;
}

async function callBotSend(message) {
  const envelope = await rpcClient.call("bot.chat.send", {
    data: {
      sessionId,
      machineId: normalizedMachineId(),
      message,
    },
  });

  if (envelope?.error) {
    const detail = envelope.error?.message || "Unknown bot error";
    throw new Error(detail);
  }
  if (!envelope?.data) {
    throw new Error("Missing bot response payload");
  }

  return envelope.data;
}

async function callBotHistory() {
  if (!sessionId) {
    return [];
  }
  const envelope = await rpcClient.call("bot.chat.history", {
    data: { sessionId },
  });
  if (envelope?.error) {
    throw new Error(envelope.error?.message || "History lookup failed");
  }
  return Array.isArray(envelope?.data?.entries) ? envelope.data.entries : [];
}

async function callBotClear() {
  if (!sessionId) {
    return;
  }
  await rpcClient.call("bot.chat.clear", {
    data: { sessionId },
  });
}

async function sendMessage(message, { logUser = true } = {}) {
  const trimmed = String(message || "").trim();
  if (!trimmed) {
    return;
  }

  if (logUser) {
    appendLog("user", trimmed);
  }
  setStatus("Processing...", "connecting");

  try {
    const response = await callBotSend(trimmed);
    sessionId = response.sessionId || sessionId;
    if (sessionId) {
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    appendLog("assistant", response.reply || "No response");
    renderSuggestions(response.suggestions || []);
    renderResult(response.result || {});
    setStatus(`Session: ${sessionId}`, "connected");
  } catch (error) {
    appendLog("assistant", error.message, true);
    setStatus("Request failed", "error");
  }
}

function parseAmountValue() {
  const parsed = Number.parseFloat(String(amountInputEl?.value || "").trim());
  if (Number.isFinite(parsed)) {
    return parsed;
  }
  return 120;
}

function buildTransitionCommand({ dryRun }) {
  const event = String(eventInputEl?.value || "").trim().toLowerCase() || "approve";
  const entityId = String(entityInputEl?.value || "").trim() || "order-1";
  const amount = parseAmountValue();
  const expectedState = String(expectedStateInputEl?.value || "").trim();
  const expectedVersion = String(expectedVersionInputEl?.value || "").trim();
  const idempotency = String(idempotencyInputEl?.value || "").trim();

  const command = dryRun ? "/simulate" : "/apply";
  const parts = [command, event, entityId, `amount=${amount}`];
  if (expectedState) {
    parts.push(`expectedState=${expectedState}`);
  }
  if (expectedVersion) {
    parts.push(`expectedVersion=${expectedVersion}`);
  }
  if (idempotency) {
    parts.push(`idempotency=${idempotency}`);
  }
  return parts.join(" ");
}

async function populateMachineSelect(defaultMachine) {
  machineSelectEl.innerHTML = "";
  let items = [];
  try {
    const envelope = await rpcClient.call("fsm.authoring.list_machines", {
      data: { includeDrafts: true, limit: 25 },
    });
    items = Array.isArray(envelope?.data?.items) ? envelope.data.items : [];
  } catch (_) {
    items = [];
  }

  if (items.length === 0) {
    const option = document.createElement("option");
    option.value = defaultMachine;
    option.textContent = defaultMachine;
    machineSelectEl.appendChild(option);
    machineSelectEl.value = defaultMachine;
    return;
  }

  for (const item of items) {
    const option = document.createElement("option");
    option.value = item.machineId;
    option.textContent = `${item.machineId} (${item.version})`;
    machineSelectEl.appendChild(option);
  }
  machineSelectEl.value = items.some((item) => item.machineId === defaultMachine)
    ? defaultMachine
    : items[0].machineId;
}

async function restoreHistoryIfAny() {
  const storedSessionId = String(localStorage.getItem(SESSION_STORAGE_KEY) || "").trim();
  if (!storedSessionId) {
    return false;
  }
  sessionId = storedSessionId;
  try {
    const entries = await callBotHistory();
    if (!entries.length) {
      return false;
    }
    for (const entry of entries) {
      const role = entry?.role === "user" ? "user" : "assistant";
      appendLog(role, entry?.message || "");
    }
    setStatus(`Session: ${sessionId}`, "connected");
    return true;
  } catch (_) {
    sessionId = "";
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return false;
  }
}

async function runPlaybook(name) {
  const playbooks = {
    quickstart: [
      "/status order-1 amount=120",
      "/simulate approve order-1 amount=120",
      "/validate",
      "/publish",
    ],
    "manual-review": [
      "/simulate reroute order-approved amount=120",
      "/simulate reroute order-approved amount=1500",
      "/apply reroute order-approved amount=1500",
    ],
    "conflict-check": [
      "/add-transition approved escalate escalated",
      "/validate",
      "/publish",
    ],
  };

  const commands = playbooks[name];
  if (!Array.isArray(commands)) {
    appendLog("assistant", `Unknown playbook '${name}'.`, true);
    return;
  }

  for (const command of commands) {
    await sendMessage(command);
  }
}

async function boot() {
  setStatus("Loading builder...", "connecting");

  const bootstrapResponse = await fetch("/api/bootstrap", {
    headers: { accept: "application/json" },
  });
  if (!bootstrapResponse.ok) {
    throw new Error(`Bootstrap failed (${bootstrapResponse.status})`);
  }
  const bootstrap = await bootstrapResponse.json();
  machineId = bootstrap.machineId || machineId;

  const mountElement = document.getElementById("builder-root");
  if (!mountElement) {
    throw new Error("Missing #builder-root element");
  }

  mountFSMUIBuilder(mountElement, {
    machineId,
    initialDocument: bootstrap.initialDocument,
    rpcClient,
  });

  await populateMachineSelect(machineId);
  entityInputEl.value = "order-1";
  eventInputEl.value = "approve";
  amountInputEl.value = "120";

  const restored = await restoreHistoryIfAny();
  setStatus("Connected", "connected");
  if (!restored) {
    await sendMessage("/help", { logUser: false });
  }
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = inputEl.value;
  inputEl.value = "";
  inputEl.focus();
  await sendMessage(message);
});

document.querySelector(".chat-toolbar")?.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }
  const command = target.dataset.command;
  if (!command) {
    return;
  }
  inputEl.value = command;
  await sendMessage(command);
});

suggestionsEl.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }
  const command = target.dataset.command;
  if (!command) {
    return;
  }
  inputEl.value = command;
  await sendMessage(command);
});

simulateBtnEl.addEventListener("click", async () => {
  const command = buildTransitionCommand({ dryRun: true });
  inputEl.value = command;
  await sendMessage(command);
});

applyBtnEl.addEventListener("click", async () => {
  const command = buildTransitionCommand({ dryRun: false });
  inputEl.value = command;
  await sendMessage(command);
});

machineSelectEl.addEventListener("change", () => {
  machineId = normalizedMachineId();
});

document.querySelectorAll("[data-playbook]").forEach((element) => {
  element.addEventListener("click", async (event) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    const name = target.dataset.playbook;
    if (!name) {
      return;
    }
    await runPlaybook(name);
  });
});

clearBtnEl.addEventListener("click", async () => {
  try {
    await callBotClear();
  } catch (_) {
    // Ignore clear failures and still reset local state.
  }
  sessionId = "";
  localStorage.removeItem(SESSION_STORAGE_KEY);
  clearChatLog();
  renderSuggestions([]);
  renderResult({});
  setStatus("Connected", "connected");
});

resultCopyEl.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultJsonEl.textContent || "{}");
    setStatus("Mechanics JSON copied", "connected");
  } catch (_) {
    setStatus("Copy failed", "error");
  }
});

boot().catch((error) => {
  setStatus("Startup failed", "error");
  appendLog("assistant", `Startup error: ${error.message}`, true);
});
