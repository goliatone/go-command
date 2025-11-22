// API helpers
const API = {
    async get(url) {
        console.log('GET', url);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    },
    async post(url, data) {
        console.log('POST', url, data);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            console.log('Response status:', response.status);
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                console.error('Response error:', error);
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Response data:', result);
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
};

// Toast notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}

// State Machine
let stateMachineConfig = null;

async function loadStateMachine() {
    try {
        const data = await API.get('/api/config');
        stateMachineConfig = data;
        renderStateDiagram(data);
    } catch (error) {
        showToast('Failed to load state machine configuration', 'error');
    }
}

function renderStateDiagram(config) {
    const container = document.getElementById('state-diagram');

    let html = '<div class="states">';

    config.states.forEach(state => {
        const badges = [];
        if (state.initial) badges.push('<span class="badge badge-initial">initial</span>');
        if (state.terminal) badges.push('<span class="badge badge-terminal">terminal</span>');

        html += `
            <div class="state">
                <div class="state-name">${state.name}</div>
                ${badges.length > 0 ? `<div class="state-badges">${badges.join('')}</div>` : ''}
            </div>
        `;
    });

    html += '</div><div class="transitions">';

    config.transitions.forEach(transition => {
        const guards = transition.guard ? `<span class="badge badge-guard">🔒 ${transition.guard}</span>` : '';
        const actions = transition.action ? `<span class="badge badge-action">⚡ ${transition.action}</span>` : '';

        html += `
            <div class="transition">
                <div class="transition-label">
                    <strong>${transition.name}</strong>: ${transition.from} → ${transition.to}
                </div>
                ${guards}${actions}
            </div>
        `;
    });

    html += '</div>';

    container.innerHTML = html;
}

// Orders
async function loadOrders() {
    try {
        const data = await API.get('/api/orders');
        renderOrders(data.orders);
    } catch (error) {
        showToast('Failed to load orders', 'error');
    }
}

function renderOrders(orders) {
    const container = document.getElementById('orders-list');

    if (!orders || orders.length === 0) {
        container.innerHTML = '<p class="text-muted">No orders yet. Create one to get started.</p>';
        return;
    }

    let html = '';
    orders.forEach(order => {
        const stateClass = getStateClass(order.state);
        html += `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-state ${stateClass}">${order.state}</span>
                </div>
                <div class="order-actions" id="actions-${order.id}">
                    <div class="loading-small">Loading actions...</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Load available transitions for each order
    orders.forEach(order => loadOrderActions(order.id));
}

function getStateClass(state) {
    switch (state) {
        case 'draft': return 'state-draft';
        case 'approved': return 'state-approved';
        case 'fulfilled': return 'state-fulfilled';
        case 'cancelled': return 'state-cancelled';
        default: return '';
    }
}

async function loadOrderActions(orderId) {
    const adminMode = document.getElementById('admin-mode').checked;

    try {
        const data = await API.get(`/api/orders/${orderId}/transitions?admin=${adminMode}`);
        renderOrderActions(orderId, data.transitions);
    } catch (error) {
        console.error('Failed to load transitions:', error);
    }
}

function renderOrderActions(orderId, transitions) {
    const container = document.getElementById(`actions-${orderId}`);

    if (!transitions || transitions.length === 0) {
        container.innerHTML = '<p class="text-muted">No actions available</p>';
        return;
    }

    let html = '<div class="action-buttons">';
    transitions.forEach(transition => {
        html += `<button class="btn btn-small btn-transition" onclick="executeTransition('${orderId}', '${transition}')">${transition}</button>`;
    });
    html += '</div>';

    container.innerHTML = html;
}

async function createOrder() {
    console.log('Creating order...');
    try {
        const data = await API.post('/api/orders', {});
        console.log('Order created:', data);
        showToast(`Order ${data.order.id} created`, 'success');
        await loadOrders();
        await loadAuditLog();
    } catch (error) {
        console.error('Failed to create order:', error);
        showToast(error.message, 'error');
    }
}

async function executeTransition(orderId, event) {
    const adminMode = document.getElementById('admin-mode').checked;

    const actionsContainer = document.getElementById(`actions-${orderId}`);
    const buttons = actionsContainer ? actionsContainer.querySelectorAll('button') : [];
    buttons.forEach(btn => btn.disabled = true);

    try {
        const data = await API.post(`/api/orders/${orderId}/transition`, {
            event: event,
            admin: adminMode
        });
        showToast(`Order ${orderId} transitioned to ${data.order.state}`, 'success');
        await loadOrders();
        await loadAuditLog();
    } catch (error) {
        // Extract readable error message
        let message = error.message;
        if (message.includes('STATE_MACHINE_TRANSITION_MISSING')) {
            message = `Cannot execute "${event}" - invalid transition for current state`;
        } else if (message.includes('STATE_MACHINE_GUARD_BLOCKED')) {
            message = `Cannot execute "${event}" - admin privileges required`;
        }
        showToast(message, 'error');
        // Reload to ensure UI is in sync
        await loadOrders();
    } finally {
        buttons.forEach(btn => btn.disabled = false);
    }
}

// Audit Log
async function loadAuditLog() {
    try {
        const data = await API.get('/api/audit-log');
        renderAuditLog(data.log);
    } catch (error) {
        console.error('Failed to load audit log:', error);
    }
}

function renderAuditLog(log) {
    const container = document.getElementById('audit-log');

    if (!log || log.length === 0) {
        container.innerHTML = '<p class="text-muted">No events yet.</p>';
        return;
    }

    let html = '<div class="log-entries">';
    // Show most recent first
    log.slice().reverse().forEach(entry => {
        html += `<div class="log-entry">${entry}</div>`;
    });
    html += '</div>';

    container.innerHTML = html;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadStateMachine();
    loadOrders();
    loadAuditLog();

    document.getElementById('create-order-btn').addEventListener('click', createOrder);

    document.getElementById('admin-mode').addEventListener('change', () => {
        loadOrders();
    });

    // Refresh data periodically
    setInterval(() => {
        loadOrders();
        loadAuditLog();
    }, 5000);
});
