// upload-log.js - Upload Log Page Logic

let selectedFile = null;

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const analyzeBtn = document.getElementById('analyzeBtn');
const userNameDisplay = document.getElementById('userNameDisplay');

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
    
    const uploadCard = document.querySelector('.upload-card');
    if (uploadCard) {
        uploadCard.insertBefore(msgDiv, uploadCard.firstChild);
    }
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 4000);
}

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

// Trigger file input
function triggerFileInput() {
    fileInput.click();
}

// Process uploaded file
function processFile(file) {
    // Check file type
    const validExtensions = ['.log', '.txt', '.json', '.csv'];
    const fileName_lower = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName_lower.endsWith(ext));
    
    if (!isValid) {
        showMessage('Please upload .log, .txt, .json, or .csv files only', 'error');
        return false;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showMessage('File size must be less than 10MB', 'error');
        return false;
    }
    
    selectedFile = file;
    
    // Show file info
    fileInfo.classList.remove('hidden');
    fileName.innerText = file.name;
    fileSize.innerText = (file.size / 1024).toFixed(2) + ' KB';
    
    // Enable analyze button
    analyzeBtn.disabled = false;
    analyzeBtn.style.opacity = '1';
    analyzeBtn.style.cursor = 'pointer';
    
    showMessage(`File "${file.name}" ready for analysis!`, 'success');
    return true;
}

// Clear selected file
function clearFile() {
    selectedFile = null;
    fileInfo.classList.add('hidden');
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.5';
    analyzeBtn.style.cursor = 'not-allowed';
    fileInput.value = '';
}

// Read file content
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

// Analyze log file
async function analyzeLog() {
    if (!selectedFile) {
        showMessage('Please select a file first', 'warning');
        return;
    }
    
    showMessage('Analyzing log file...', 'warning');
    
    try {
        const content = await readFileContent(selectedFile);
        
        // Parse log content
        const lines = content.split('\n');
        const analysis = {
            fileName: selectedFile.name,
            timestamp: new Date().toISOString(),
            totalLines: lines.length,
            failedLogins: lines.filter(l => l.includes('401') && l.includes('/login')).length,
            suspiciousPaths: lines.filter(l => l.includes('../')).length,
            adminAccess: lines.filter(l => l.includes('/admin')).length,
            errors: lines.filter(l => l.toLowerCase().includes('error')).length,
            content: content.substring(0, 5000)
        };
        
        // Calculate risk score
        let riskScore = 0;
        riskScore += Math.min(analysis.failedLogins * 2, 40);
        riskScore += Math.min(analysis.suspiciousPaths * 5, 30);
        riskScore += Math.min(analysis.adminAccess * 3, 20);
        riskScore += Math.min(analysis.errors, 10);
        analysis.riskScore = Math.min(riskScore, 100);
        
        // Determine risk level
        if (analysis.riskScore >= 70) analysis.riskLevel = 'High';
        else if (analysis.riskScore >= 40) analysis.riskLevel = 'Medium';
        else analysis.riskLevel = 'Low';
        
        // Store analysis results for dashboard
        localStorage.setItem('lastAnalysis', JSON.stringify(analysis));
        
        // ============================================
        // SAVE TO SCAN HISTORY
        // ============================================
        let scanHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
        scanHistory.unshift({
            id: Date.now(),
            fileName: selectedFile.name,
            timestamp: new Date().toISOString(),
            riskScore: analysis.riskScore,
            riskLevel: analysis.riskLevel,
            failedLogins: analysis.failedLogins,
            suspiciousPaths: analysis.suspiciousPaths,
            adminAccess: analysis.adminAccess,
            errors: analysis.errors,
            totalLines: analysis.totalLines
        });
        // Keep only last 20 scans
        if (scanHistory.length > 20) scanHistory.pop();
        localStorage.setItem('scanHistory', JSON.stringify(scanHistory));
        // ============================================
        
        showMessage('Analysis complete! Redirecting to dashboard...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error reading file. Please try again.', 'error');
    }
}

// Use sample log for demo
function useSampleLog() {
    const sampleContent = `192.168.1.100 - - [22/May/2026:10:15:23 +0000] "POST /login HTTP/1.1" 401 1234
192.168.1.101 - - [22/May/2026:10:15:24 +0000] "POST /login HTTP/1.1" 401 1234
192.168.1.102 - - [22/May/2026:10:15:25 +0000] "POST /login HTTP/1.1" 401 1234
192.168.1.103 - - [22/May/2026:10:15:26 +0000] "POST /login HTTP/1.1" 200 5678
192.168.1.104 - - [22/May/2026:10:15:27 +0000] "GET /admin/config HTTP/1.1" 403 234
192.168.1.105 - - [22/May/2026:10:15:28 +0000] "GET /../../etc/passwd HTTP/1.1" 404 345
192.168.1.106 - - [22/May/2026:10:15:29 +0000] "POST /login HTTP/1.1" 401 1234
192.168.1.107 - - [22/May/2026:10:15:30 +0000] "POST /login HTTP/1.1" 401 1234
192.168.1.108 - - [22/May/2026:10:15:31 +0000] "GET /admin HTTP/1.1" 200 9876
192.168.1.109 - - [22/May/2026:10:15:32 +0000] "POST /login HTTP/1.1" 401 1234
192.168.1.110 - - [22/May/2026:10:15:33 +0000] "GET /../../wp-config.php HTTP/1.1" 404 567`;
    
    const file = new File([sampleContent], "sample_apache_access.log", { type: "text/plain" });
    processFile(file);
}

// Copy sample log to clipboard
function copySampleLog() {
    const sampleContent = document.getElementById('sampleLogContent');
    if (sampleContent) {
        const text = sampleContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Sample log copied to clipboard!', 'success');
        }).catch(() => {
            showMessage('Failed to copy', 'error');
        });
    }
}

// Initialize drag and drop
function initDragDrop() {
    if (!dropZone) return;
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    });
    
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files[0]) processFile(e.target.files[0]);
        });
    }
}

// Initialize page
function initUploadPage() {
    checkAuth();
    initDragDrop();
    
    // Add change mood button listener
    const changeMoodBtn = document.getElementById('changeMoodBtn');
    if (changeMoodBtn) {
        changeMoodBtn.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
}

// Make functions global for onclick handlers
window.logout = logout;
window.clearFile = clearFile;
window.analyzeLog = analyzeLog;
window.useSampleLog = useSampleLog;
window.copySampleLog = copySampleLog;
window.triggerFileInput = triggerFileInput;

document.addEventListener('DOMContentLoaded', initUploadPage);