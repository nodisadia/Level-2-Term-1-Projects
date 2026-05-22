// otp-verification.js - OTP Verification Page Logic

// DOM Elements
const otpInputs = document.querySelectorAll('.otp-input');
const verifyBtn = document.getElementById('verifyBtn');
const resendBtn = document.getElementById('resendBtn');
const timerSpan = document.getElementById('timer');

// Timer variables
let timeLeft = 120; // 2 minutes in seconds
let timerInterval = null;

// Get stored email and OTP
const resetEmail = localStorage.getItem('resetEmail');
const storedOTP = localStorage.getItem('resetOTP');

// Helper function to show message
function showMessage(message, type, isHtml = false) {
    const existingMsg = document.querySelector('.success-message, .error-message, .warning-message');
    if (existingMsg) existingMsg.remove();
    
    let icon = '';
    if (type === 'success') icon = 'fas fa-check-circle';
    else if (type === 'error') icon = 'fas fa-exclamation-circle';
    else if (type === 'warning') icon = 'fas fa-exclamation-triangle';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `${type}-message`;
    
    if (isHtml) {
        msgDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
    } else {
        msgDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
    }
    
    const otpForm = document.querySelector('.otp-form');
    otpForm.insertBefore(msgDiv, otpForm.firstChild);
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 5000);
}

// Auto-move to next input field
function initOtpInputs() {
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && index > 0 && input.value === '') {
                otpInputs[index - 1].focus();
            }
        });
        
        // Allow only numbers
        input.addEventListener('keypress', (e) => {
            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
}

// Get entered OTP
function getEnteredOTP() {
    let otp = '';
    otpInputs.forEach(input => {
        otp += input.value;
    });
    return otp;
}

// Clear all OTP inputs
function clearOtpInputs() {
    otpInputs.forEach(input => {
        input.value = '';
    });
    otpInputs[0].focus();
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        verifyBtn.classList.add('loading');
        verifyBtn.innerHTML = '<i class="fas fa-spinner"></i> Verifying...';
        verifyBtn.disabled = true;
    } else {
        verifyBtn.classList.remove('loading');
        verifyBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify OTP';
        verifyBtn.disabled = false;
    }
}

// Timer function
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timeLeft = 120;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerSpan.textContent = '00:00';
            resendBtn.disabled = false;
            showMessage('OTP expired! Please resend.', 'warning');
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Resend OTP
async function resendOTP() {
    if (!resetEmail) {
        showMessage('Session expired. Please go back to forgot password page.', 'error');
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 2000);
        return;
    }
    
    resendBtn.disabled = true;
    resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate new OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('resetOTP', newOTP);
    
    console.log(`New OTP for ${resetEmail}: ${newOTP}`); // For testing
    
    showMessage(`✅ New OTP sent! Demo OTP: ${newOTP}`, 'success');
    
    resendBtn.innerHTML = '<i class="fas fa-redo-alt"></i> Resend OTP';
    clearOtpInputs();
    startTimer();
}

// Verify OTP
async function verifyOTP() {
    const enteredOTP = getEnteredOTP();
    
    if (enteredOTP.length !== 6) {
        showMessage('Please enter the complete 6-digit OTP', 'warning');
        return;
    }
    
    if (!storedOTP) {
        showMessage('Session expired. Please request a new OTP.', 'error');
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 2000);
        return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (enteredOTP === storedOTP) {
        showMessage('✅ OTP verified successfully! Redirecting to reset password...', 'success');
        
        // Clear OTP from storage
        localStorage.removeItem('resetOTP');
        
        setTimeout(() => {
            window.location.href = 'reset-password.html';
        }, 1500);
    } else {
        showMessage('❌ Invalid OTP. Please try again.', 'error');
        setLoading(false);
        clearOtpInputs();
    }
}

// Check if email exists
function checkSession() {
    if (!resetEmail) {
        showMessage('No active session. Please request password reset first.', 'error');
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 2000);
    }
}

// Initialize page
function initOtpPage() {
    checkSession();
    initOtpInputs();
    startTimer();
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', verifyOTP);
    }
    
    if (resendBtn) {
        resendBtn.addEventListener('click', resendOTP);
    }
    
    // Show demo OTP in console for testing
    if (storedOTP) {
        console.log(`Demo OTP for testing: ${storedOTP}`);
    }
}

document.addEventListener('DOMContentLoaded', initOtpPage);