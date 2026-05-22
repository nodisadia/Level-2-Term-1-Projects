// admin.js - Admin Page Logic (Fully Working)

let currentFilter = 'all';
let currentRequestId = null;
let activityChart = null;

// ========== CHECK ADMIN AUTH ==========
function checkAdminAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
        window.location.href = 'dashboard.html';
        return false;
    }
    document.getElementById('userNameDisplay').innerText = userData.email.split('@')[0];
    return true;
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// ========== GET DATA ==========
function getUsers() {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
}

function getScans() {
    const stored = localStorage.getItem('scanHistory');
    return stored ? JSON.parse(stored) : [];
}

function getRequests() {
    const stored = localStorage.getItem('premiumRequests');
    return stored ? JSON.parse(stored) : [];
}

function getRules() {
    const stored = localStorage.getItem('securityRules');
    return stored ? JSON.parse(stored) : [];
}

// ========== TAB SWITCHING ==========
function switchToTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    document.getElementById(`${tabName}Tab`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    if (tabName === 'dashboard') loadDashboard();
    else if (tabName === 'requests') loadRequests();
    else if (tabName === 'rules') loadRules();
    else if (tabName === 'users') loadUsers();
}

// ========== DASHBOARD ==========
function loadDashboard() {
    const users = getUsers();
    const requests = getRequests();
    const scans = getScans();
    
    document.getElementById('totalUsers').innerText = users.length;
    document.getElementById('totalScans').innerText = scans.length;
    document.getElementById('pendingRequests').innerText = requests.filter(r => r.status === 'pending').length;
    document.getElementById('resolvedRequests').innerText = requests.filter(r => r.status === 'resolved').length;
    
    // Chart
    const ctx = document.getElementById('activityChart');
    if (ctx && scans.length > 0) {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            last7Days.push(d.toLocaleDateString());
        }
        const scanCounts = last7Days.map(day => scans.filter(s => new Date(s.timestamp).toLocaleDateString() === day).length);
        if (activityChart) activityChart.destroy();
        activityChart = new Chart(ctx, {
            type: 'line',
            data: { labels: last7Days.map(d => d.substring(5)), datasets: [{ label: 'Scans', data: scanCounts, borderColor: '#06b6d4', fill: true }] },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    // Recent activity
    const container = document.getElementById('recentActivity');
    if (requests.length === 0) container.innerHTML = '<div class="no-data">No recent activity</div>';
    else container.innerHTML = requests.slice(-5).reverse().map(r => `
        <div class="recent-item"><div class="recent-icon ${r.status}"><i class="fas ${r.status === 'pending' ? 'fa-clock' : 'fa-check-circle'}"></i></div>
        <div class="recent-details"><div class="recent-text">${r.status === 'pending' ? 'New request from' : 'Resolved for'} ${r.userId}</div>
        <div class="recent-time">${new Date(r.timestamp).toLocaleString()}</div></div></div>
    `).join('');
}

// ========== REQUESTS ==========
function loadRequests() {
    let requests = getRequests();
    if (currentFilter !== 'all') requests = requests.filter(r => r.status === currentFilter);
    const tbody = document.getElementById('requestsTableBody');
    if (requests.length === 0) { tbody.innerHTML = '<tr><td colspan="7" class="no-data">No requests found</td></tr>'; return; }
    tbody.innerHTML = requests.map(r => `
        <tr><td>#${r.id}</td><td>${escapeHtml(r.userId)}</td><td style="max-width:300px;">${escapeHtml(r.problem.substring(0, 60))}${r.problem.length > 60 ? '...' : ''}</td>
        <td><span class="status-badge ${r.status}">${r.status}</span></td><td>${new Date(r.timestamp).toLocaleDateString()}</td>
        <td>${r.solution ? `<button class="action-btn" onclick="viewSolution('${r.id}')">View</button>` : 'Pending'}</td>
        <td>${!r.solution ? `<button class="action-btn" onclick="openSolutionModal('${r.id}')">Provide Solution</button>` : 'Completed'}</td></tr>
    `).join('');
}

function filterRequests(filter) { currentFilter = filter; loadRequests(); }

function openSolutionModal(id) {
    const r = getRequests().find(r => r.id == id);
    if (r) { currentRequestId = id; document.getElementById('modalProblemDesc').innerHTML = `<strong>Problem:</strong><br>${escapeHtml(r.problem)}`; document.getElementById('solutionText').value = ''; document.getElementById('solutionModal').classList.remove('hidden'); }
}
function closeSolutionModal() { document.getElementById('solutionModal').classList.add('hidden'); }
function submitSolution() {
    const solution = document.getElementById('solutionText').value;
    if (!solution.trim()) { alert('Enter a solution'); return; }
    let requests = getRequests();
    const idx = requests.findIndex(r => r.id == currentRequestId);
    if (idx !== -1) { requests[idx].solution = solution; requests[idx].status = 'resolved'; localStorage.setItem('premiumRequests', JSON.stringify(requests)); alert('Solution provided!'); closeSolutionModal(); loadRequests(); loadDashboard(); }
}
function viewSolution(id) {
    const r = getRequests().find(r => r.id == id);
    if (r && r.solution) alert(`Solution:\n\n${r.solution}`);
}

// ========== USERS ==========
function loadUsers() {
    const users = getUsers();
    const tbody = document.getElementById('usersTableBody');
    if (users.length === 0) { tbody.innerHTML = '<tr><td colspan="7" class="no-data">No users</td></tr>'; return; }
    tbody.innerHTML = users.map((u, i) => `
        <tr><td>${i+1}</td><td>${escapeHtml(u.fullname || 'N/A')}</td><td>${escapeHtml(u.username)}</td><td>${escapeHtml(u.email)}</td>
        <td><span class="status-badge ${u.role === 'admin' ? 'resolved' : 'pending'}">${u.role || 'user'}</span></td>
        <td>${u.registeredAt ? new Date(u.registeredAt).toLocaleDateString() : 'N/A'}</td>
        <td>${u.role !== 'admin' ? `<button class="action-btn delete" onclick="deleteUser('${u.email}')">Delete</button>` : '<span class="admin-badge">Admin</span>'}</td></tr>
    `).join('');
}
function deleteUser(email) { if (confirm('Delete user?')) { let users = getUsers().filter(u => u.email !== email); localStorage.setItem('registeredUsers', JSON.stringify(users)); loadUsers(); loadDashboard(); alert('User deleted'); } }

// ========== RULES ==========
function loadRules() {
    let rules = getRules();
    const container = document.getElementById('rulesList');
    if (rules.length === 0) { container.innerHTML = '<div class="no-data">No rules. Add one above.</div>'; return; }
    container.innerHTML = rules.map(r => `
        <div class="rule-item"><div class="rule-info"><div class="rule-name">${escapeHtml(r.name)} <span class="rule-severity ${r.severity}">${r.severity}</span></div>
        <div class="rule-pattern">Pattern: ${escapeHtml(r.pattern)}</div></div><button class="rule-delete" onclick="deleteRule(${r.id})"><i class="fas fa-trash"></i></button></div>
    `).join('');
}
function addSecurityRule() {
    const name = document.getElementById('ruleName').value, pattern = document.getElementById('rulePattern').value, severity = document.getElementById('ruleSeverity').value, solution = document.getElementById('ruleSolution').value;
    if (!name || !pattern) { alert('Fill name and pattern'); return; }
    let rules = getRules();
    const newId = rules.length > 0 ? Math.max(...rules.map(r => r.id)) + 1 : 1;
    rules.push({ id: newId, name, pattern, severity, solution });
    localStorage.setItem('securityRules', JSON.stringify(rules));
    document.getElementById('ruleName').value = ''; document.getElementById('rulePattern').value = ''; document.getElementById('ruleSolution').value = '';
    loadRules(); alert('Rule added');
}
function deleteRule(id) { if (confirm('Delete rule?')) { let rules = getRules().filter(r => r.id !== id); localStorage.setItem('securityRules', JSON.stringify(rules)); loadRules(); alert('Rule deleted'); } }

// ========== SCANS MODAL ==========
function openScansModal() {
    const scans = getScans();
    const container = document.getElementById('scansList');
    if (scans.length === 0) container.innerHTML = '<div class="no-data">No scan history</div>';
    else container.innerHTML = scans.map(s => `
        <div class="scan-item"><div class="scan-file"><i class="fas fa-file-alt"></i> ${escapeHtml(s.fileName)}</div>
        <span class="scan-risk ${s.riskScore >= 70 ? 'high' : s.riskScore >= 40 ? 'medium' : 'low'}">Risk: ${s.riskScore}</span>
        <div class="scan-details"><span>Critical: ${s.failedLogins || 0}</span><span>Warnings: ${s.errors || 0}</span><span>Lines: ${s.totalLines || 0}</span></div>
        <div class="scan-date">${new Date(s.timestamp).toLocaleString()}</div></div>
    `).join('');
    document.getElementById('scansModal').classList.remove('hidden');
}
function closeScansModal() { document.getElementById('scansModal').classList.add('hidden'); }

// ========== STATS CARD HELPERS ==========
function showPendingRequests() { switchToTab('requests'); currentFilter = 'pending'; loadRequests(); }
function showResolvedRequests() { switchToTab('requests'); currentFilter = 'resolved'; loadRequests(); }

// ========== HELPER ==========
function escapeHtml(text) { if (!text) return ''; return text.replace(/[&<>]/g, function(m) { if (m === '&') return '&amp;'; if (m === '<') return '&lt;'; if (m === '>') return '&gt;'; return m; }); }

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAdminAuth()) return;
    
    // Tab click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) { e.preventDefault(); switchToTab(this.getAttribute('data-tab')); });
    });
    
    // Filter button handlers
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() { filterRequests(this.getAttribute('data-filter')); });
    });
    
    // Change mood button
    document.getElementById('changeMoodBtn')?.addEventListener('click', () => window.location.href = '../index.html');
    
    // Load initial data
    loadDashboard();
    loadRequests();
    loadRules();
    loadUsers();
});

// Make functions global
window.logout = logout;
window.switchToTab = switchToTab;
window.filterRequests = filterRequests;
window.openSolutionModal = openSolutionModal;
window.closeSolutionModal = closeSolutionModal;
window.submitSolution = submitSolution;
window.viewSolution = viewSolution;
window.deleteUser = deleteUser;
window.addSecurityRule = addSecurityRule;
window.deleteRule = deleteRule;
window.openScansModal = openScansModal;
window.closeScansModal = closeScansModal;
window.showPendingRequests = showPendingRequests;
window.showResolvedRequests = showResolvedRequests;