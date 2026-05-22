// dashboard.js - Dashboard Page Logic

let riskChart = null;
let severityChart = null;
let analysisData = null;

// DOM Elements
const userNameDisplay = document.getElementById('userNameDisplay');
const riskScoreSpan = document.getElementById('riskScore');
const riskLevelSpan = document.getElementById('riskLevel');
const riskProgress = document.getElementById('riskProgress');
const criticalCountSpan = document.getElementById('criticalCount');
const warningCountSpan = document.getElementById('warningCount');
const passedCountSpan = document.getElementById('passedCount');
const analysisTimeSpan = document.getElementById('analysisTime');
const solutionsContainer = document.getElementById('solutionsList');

// Security Solutions
const securitySolutions = [
    {
        id: 1,
        title: "Brute Force Attack Detection",
        severity: "critical",
        os: "Linux",
        command: `# Block IP after 5 failed attempts using fail2ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Manually ban an IP
sudo fail2ban-client set sshd banip 192.168.1.100

# Or using iptables directly
sudo iptables -A INPUT -s 192.168.1.100 -j DROP`
    },
    {
        id: 2,
        title: "Path Traversal / Directory Traversal",
        severity: "critical",
        os: "Linux",
        command: `# Prevent directory traversal in Apache
echo 'RewriteCond %{REQUEST_URI} \\.\\./ [NC]' | sudo tee -a /etc/apache2/conf-available/security.conf
echo 'RewriteRule .* - [F]' | sudo tee -a /etc/apache2/conf-available/security.conf
sudo a2enmod rewrite
sudo systemctl restart apache2

# For Nginx:
echo 'location ~ \\.\\./ { deny all; }' | sudo tee -a /etc/nginx/sites-available/default
sudo nginx -t && sudo systemctl restart nginx`
    },
    {
        id: 3,
        title: "Unauthorized Admin Panel Access",
        severity: "critical",
        os: "Linux",
        command: `# Restrict admin panel access by IP (Nginx)
sudo tee -a /etc/nginx/sites-available/default << 'EOF'
location /admin {
    allow 192.168.1.0/24;
    deny all;
}
EOF
sudo nginx -t && sudo systemctl restart nginx`
    },
    {
        id: 4,
        title: "Missing Security Headers",
        severity: "warning",
        os: "Linux",
        command: `# Add security headers (Nginx)
sudo tee -a /etc/nginx/conf.d/security-headers.conf << 'EOF'
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
EOF
sudo systemctl restart nginx`
    },
    {
        id: 5,
        title: "SQL Injection Protection",
        severity: "critical",
        os: "All",
        command: `# Use parameterized queries (PHP Example)
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();

# Enable ModSecurity for Apache
sudo apt install libapache2-mod-security2 -y
sudo a2enmod security2
sudo systemctl restart apache2`
    }
];

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

// Helper function to show message
function showMessage(message, type) {
    const existingMsg = document.querySelector('.success-message, .error-message, .warning-message');
    if (existingMsg) existingMsg.remove();
    
    let icon = '';
    if (type === 'success') icon = 'fas fa-check-circle';
    else if (type === 'error') icon = 'fas fa-exclamation-circle';
    else if (type === 'warning') icon = 'fas fa-exclamation-triangle';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `${type}-message`;
    msgDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 4000);
}

// Show "No Analysis" message
function showNoAnalysisMessage() {
    const statsGrid = document.querySelector('.stats-grid');
    const chartsGrid = document.querySelector('.charts-grid');
    const solutionsSection = document.querySelector('.solutions-section');
    const premiumSection = document.querySelector('.premium-section');
    
    if (statsGrid) statsGrid.style.display = 'none';
    if (chartsGrid) chartsGrid.style.display = 'none';
    if (solutionsSection) solutionsSection.style.display = 'none';
    if (premiumSection) premiumSection.style.display = 'none';
    
    // Remove existing no-data container if any
    const existingNoData = document.querySelector('.no-data-container');
    if (existingNoData) existingNoData.remove();
    
    const noDataDiv = document.createElement('div');
    noDataDiv.className = 'no-data-container';
    noDataDiv.innerHTML = `
        <div class="no-data-card">
            <i class="fas fa-chart-line"></i>
            <h3>No Analysis Found</h3>
            <p>You haven't uploaded any log files for analysis yet.</p>
            <button onclick="window.location.href='upload-log.html'" class="btn-primary">
                <i class="fas fa-upload"></i> Upload Your First Log
            </button>
        </div>
    `;
    
    const dashboardHeader = document.querySelector('.dashboard-header');
    dashboardHeader.insertAdjacentElement('afterend', noDataDiv);
}

// Show analysis data
function showAnalysisData() {
    const statsGrid = document.querySelector('.stats-grid');
    const chartsGrid = document.querySelector('.charts-grid');
    const solutionsSection = document.querySelector('.solutions-section');
    const premiumSection = document.querySelector('.premium-section');
    const noDataDiv = document.querySelector('.no-data-container');
    
    if (statsGrid) statsGrid.style.display = 'grid';
    if (chartsGrid) chartsGrid.style.display = 'grid';
    if (solutionsSection) solutionsSection.style.display = 'block';
    if (premiumSection) premiumSection.style.display = 'block';
    if (noDataDiv) noDataDiv.remove();
}

// Load analysis data from localStorage
function loadAnalysisData() {
    const stored = localStorage.getItem('lastAnalysis');
    
    if (stored) {
        analysisData = JSON.parse(stored);
        showAnalysisData();
        updateDashboardWithData(analysisData);
        loadSolutionsBasedOnIssues();
    } else {
        showNoAnalysisMessage();
    }
}

// Update dashboard with analysis data
function updateDashboardWithData(data) {
    // Update risk score
    const riskScore = data.riskScore || 0;
    riskScoreSpan.innerText = riskScore;
    
    // Update risk progress bar
    riskProgress.style.width = `${riskScore}%`;
    riskProgress.className = `risk-progress-bar ${riskScore >= 70 ? 'high' : riskScore >= 40 ? 'medium' : 'low'}`;
    
    // Set risk level
    let level = '';
    let levelClass = '';
    if (riskScore >= 70) {
        level = 'HIGH RISK';
        levelClass = 'high';
    } else if (riskScore >= 40) {
        level = 'MEDIUM RISK';
        levelClass = 'medium';
    } else {
        level = 'LOW RISK';
        levelClass = 'low';
    }
    riskLevelSpan.innerHTML = `<span class="level-badge ${levelClass}">⚠️ ${level}</span>`;
    
    // Update counts
    const criticalCount = (data.failedLogins || 0) + (data.suspiciousPaths || 0) + (data.adminAccess || 0);
    const warningCount = data.errors || 0;
    const passedCount = Math.max(0, 10 - criticalCount - warningCount);
    
    criticalCountSpan.innerText = criticalCount;
    warningCountSpan.innerText = warningCount;
    passedCountSpan.innerText = passedCount;
    
    // Update time
    if (data.timestamp) {
        analysisTimeSpan.innerText = new Date(data.timestamp).toLocaleString();
    }
    
    // Draw charts
    drawCharts(criticalCount, warningCount, passedCount, data);
}

// Draw charts
function drawCharts(critical, warnings, passed, data) {
    // Pie Chart
    const pieCtx = document.getElementById('riskPieChart');
    if (pieCtx) {
        if (riskChart) riskChart.destroy();
        riskChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Critical Issues', 'Warnings', 'Passed Checks'],
                datasets: [{
                    data: [critical, warnings, passed],
                    backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9ca3af', font: { size: 11 } }
                    }
                }
            }
        });
    }
    
    // Bar Chart
    const barCtx = document.getElementById('severityChart');
    if (barCtx) {
        if (severityChart) severityChart.destroy();
        severityChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Brute Force', 'Path Traversal', 'Admin Access', 'Errors', 'Other'],
                datasets: [{
                    label: 'Detection Count',
                    data: [
                        data.failedLogins || 0,
                        data.suspiciousPaths || 0,
                        data.adminAccess || 0,
                        data.errors || 0,
                        0
                    ],
                    backgroundColor: '#06b6d4',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { labels: { color: '#9ca3af', font: { size: 11 } } }
                },
                scales: {
                    y: {
                        ticks: { color: '#9ca3af' },
                        grid: { color: '#374151' }
                    },
                    x: {
                        ticks: { color: '#9ca3af' },
                        grid: { color: '#374151' }
                    }
                }
            }
        });
    }
}

// Load solutions based on detected issues
function loadSolutionsBasedOnIssues() {
    if (!solutionsContainer) return;
    
    // If no analysis data
    if (!analysisData) {
        return;
    }
    
    // Check if there are any issues
    const hasIssues = (analysisData.failedLogins > 0) || 
                      (analysisData.suspiciousPaths > 0) || 
                      (analysisData.adminAccess > 0) || 
                      (analysisData.errors > 0);
    
    if (!hasIssues) {
        solutionsContainer.innerHTML = `
            <div class="no-issues-card">
                <i class="fas fa-check-circle"></i>
                <h3>No Security Issues Detected!</h3>
                <p>Your log analysis shows no security threats. Great job!</p>
            </div>
        `;
        return;
    }
    
    // Build relevant solutions based on detected issues
    let relevantSolutions = [];
    let solutionMessages = [];
    
    if (analysisData.failedLogins > 0) {
        relevantSolutions.push(securitySolutions[0]);
        solutionMessages.push(`• ${analysisData.failedLogins} failed login attempts detected - Possible brute force attack`);
    }
    if (analysisData.suspiciousPaths > 0) {
        relevantSolutions.push(securitySolutions[1]);
        solutionMessages.push(`• ${analysisData.suspiciousPaths} path traversal attempts detected`);
    }
    if (analysisData.adminAccess > 0) {
        relevantSolutions.push(securitySolutions[2]);
        solutionMessages.push(`• ${analysisData.adminAccess} unauthorized admin access attempts`);
    }
    if (analysisData.errors > 0) {
        relevantSolutions.push(securitySolutions[3]);
        solutionMessages.push(`• ${analysisData.errors} error responses detected`);
    }
    
    // Add summary header
    const summaryHtml = `
        <div class="detection-summary">
            <h4><i class="fas fa-chart-simple"></i> Detected Issues Summary</h4>
            <ul>
                ${solutionMessages.map(msg => `<li>${msg}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Add solution cards
    const solutionsHtml = relevantSolutions.map(solution => {
        const severityClass = solution.severity === 'critical' ? 'critical' : 'warning';
        const severityIcon = solution.severity === 'critical' ? 'fa-bug' : 'fa-exclamation-triangle';
        
        return `
            <div class="solution-card">
                <div class="solution-header">
                    <div class="solution-title">
                        <div class="solution-icon" style="background: ${solution.severity === 'critical' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 152, 0, 0.1)'}; color: ${solution.severity === 'critical' ? '#f44336' : '#ff9800'}">
                            <i class="fas ${severityIcon}"></i>
                        </div>
                        <span class="solution-name">${solution.title}</span>
                        <span class="solution-badge">${solution.os}</span>
                    </div>
                    <button onclick="copySolutionCommand(${solution.id})" class="copy-btn">
                        <i class="fas fa-copy"></i> Copy Command
                    </button>
                </div>
                <div class="solution-body">
                    <div class="command-block">
                        <pre class="command-code">${escapeHtml(solution.command)}</pre>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    solutionsContainer.innerHTML = summaryHtml + solutionsHtml;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Copy solution command
async function copySolutionCommand(id) {
    const solution = securitySolutions.find(s => s.id === id);
    if (solution) {
        try {
            await navigator.clipboard.writeText(solution.command);
            showMessage('Command copied to clipboard!', 'success');
        } catch (err) {
            showMessage('Failed to copy', 'error');
        }
    }
}

// Premium modal functions
function showPremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function submitPremiumRequest() {
    const problem = document.getElementById('userProblem');
    if (!problem.value.trim()) {
        showMessage('Please describe your security issue', 'warning');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const requests = JSON.parse(localStorage.getItem('premiumRequests') || '[]');
    
    const newRequest = {
        id: Date.now(),
        userId: user.email || 'unknown',
        problem: problem.value,
        status: 'pending',
        timestamp: new Date().toISOString()
    };
    
    requests.push(newRequest);
    localStorage.setItem('premiumRequests', JSON.stringify(requests));
    
    showMessage('Premium request submitted! A technician will respond within 24 hours.', 'success');
    closePremiumModal();
    problem.value = '';
}

// Add CSS for no data message and detection summary
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .no-data-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            padding: 2rem;
        }
        .no-data-card {
            text-align: center;
            background: var(--card-bg);
            border-radius: 1rem;
            padding: 3rem;
            border: 1px solid var(--card-border);
            max-width: 500px;
        }
        .no-data-card i {
            font-size: 4rem;
            color: var(--accent);
            margin-bottom: 1rem;
            opacity: 0.7;
        }
        .no-data-card h3 {
            font-size: 1.5rem;
            color: var(--text-dark);
            margin-bottom: 0.5rem;
        }
        .no-data-card p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
        }
        .no-issues-card {
            text-align: center;
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid #4caf50;
            border-radius: 1rem;
            padding: 2rem;
        }
        .no-issues-card i {
            font-size: 3rem;
            color: #4caf50;
            margin-bottom: 1rem;
        }
        .no-issues-card h3 {
            color: #4caf50;
            margin-bottom: 0.5rem;
        }
        .detection-summary {
            background: rgba(244, 67, 54, 0.1);
            border: 1px solid #f44336;
            border-radius: 1rem;
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
        }
        .detection-summary h4 {
            color: #f44336;
            margin-bottom: 0.5rem;
        }
        .detection-summary ul {
            margin-left: 1.5rem;
            color: var(--text-primary);
        }
        .detection-summary li {
            margin: 0.25rem 0;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dashboard
function initDashboard() {
    checkAuth();
    addStyles();
    loadAnalysisData();
    
    // Add change mood button listener
    const changeMoodBtn = document.getElementById('changeMoodBtn');
    if (changeMoodBtn) {
        changeMoodBtn.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
}

// Make functions global
window.logout = logout;
window.copySolutionCommand = copySolutionCommand;
window.showPremiumModal = showPremiumModal;
window.closePremiumModal = closePremiumModal;
window.submitPremiumRequest = submitPremiumRequest;

document.addEventListener('DOMContentLoaded', initDashboard);