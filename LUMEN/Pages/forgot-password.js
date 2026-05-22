// forgot-password.js - Forgot Password Page Logic

const forgotForm = document.getElementById('forgotForm');
const emailInput = document.getElementById('email');
const sendBtn = document.getElementById('sendOtpBtn');

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
    
    forgotForm.insertBefore(msgDiv, forgotForm.firstChild);
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if email exists in registered users
function isEmailRegistered(email) {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        sendBtn.classList.add('loading');
        sendBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending OTP...';
        sendBtn.disabled = true;
    } else {
        sendBtn.classList.remove('loading');
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send OTP';
        sendBtn.disabled = false;
    }
}

// Handle forgot password form submission
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter your email address', 'warning');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isEmailRegistered(email)) {
        showMessage('No account found with this email. <a href="register.html" style="color: var(--accent);">Create an account</a>', 'error');
        return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store email for OTP verification
    localStorage.setItem('resetEmail', email);
    
    // Generate and store OTP (demo: 123456)
    const otp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('resetOTP', otp);
    
    console.log(`OTP for ${email}: ${otp}`); // For testing
    
    showMessage(`✅ OTP sent to ${email}! (Demo OTP: ${otp})`, 'success');
    
    setTimeout(() => {
        window.location.href = 'otp-verification.html';
    }, 2000);
}

// Initialize page
function initForgotPage() {
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
}

document.addEventListener('DOMContentLoaded', initForgotPage);