// history.js - Scan History Page

const userNameDisplay = document.getElementById('userNameDisplay');
const historyList = document.getElementById('historyList');

// Check authentication
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    const userData = JSON.parse(user);
    if (userNameDisplay) {
        userNameDisplay.innerText = userData.email.split('@')[0];
    }
    return userData;
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Get all scan history
function getScanHistory() {
    const scans = localStorage.getItem('scanHistory');
    if (scans) {
        return JSON.parse(scans);
    }
    return [];
}

// Display history
function displayHistory() {
    const scans = getScanHistory();
    
    if (scans.length === 0) {
        historyList.innerHTML = `
            <div class="no-history">
                <i class="fas fa-history"></i>
                <h3>No Scan History Found</h3>
                <p>You haven't uploaded any log files for analysis yet.</p>
                <button onclick="window.location.href='upload-log.html'" class="upload-btn">
                    <i class="fas fa-upload"></i> Upload Your First Log
                </button>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = scans.map(scan => {
        let riskClass = '';
        if (scan.riskScore >= 70) riskClass = 'high';
        else if (scan.riskScore >= 40) riskClass = 'medium';
        else riskClass = 'low';
        
        return `
            <div class="history-item" onclick="viewScan(${scan.id})">
                <div class="history-item-header">
                    <div class="history-file-name">
                        <i class="fas fa-file-alt"></i>
                        ${scan.fileName || 'Unknown File'}
                    </div>
                    <span class="risk-badge ${riskClass}">
                        Risk Score: ${scan.riskScore || 0}
                    </span>
                </div>
                <div class="history-item-details">
                    <span class="detail"><i class="fas fa-bug"></i> Critical: ${scan.failedLogins || 0}</span>
                    <span class="detail"><i class="fas fa-exclamation-triangle"></i> Warnings: ${scan.errors || 0}</span>
                    <span class="detail"><i class="fas fa-file-lines"></i> Lines: ${scan.totalLines || 0}</span>
                </div>
                <div class="history-item-footer">
                    <span class="history-date"><i class="fas fa-calendar"></i> ${new Date(scan.timestamp).toLocaleString()}</span>
                    <button class="view-btn" onclick="event.stopPropagation(); viewScan(${scan.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// View specific scan
function viewScan(scanId) {
    const scans = getScanHistory();
    const scan = scans.find(s => s.id === scanId);
    if (scan) {
        localStorage.setItem('lastAnalysis', JSON.stringify(scan));
        window.location.href = 'dashboard.html';
    }
}

// Initialize
function initHistory() {
    checkAuth();
    displayHistory();
    
    const changeMoodBtn = document.getElementById('changeMoodBtn');
    if (changeMoodBtn) {
        changeMoodBtn.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
}

// Make functions global
window.logout = logout;
window.viewScan = viewScan;

document.addEventListener('DOMContentLoaded', initHistory);