// reset-password.js - Reset Password Page Logic

// DOM Elements
const resetForm = document.getElementById('resetForm');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const resetBtn = document.getElementById('resetBtn');
const toggleNewPasswordBtn = document.getElementById('toggleNewPassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const confirmMessage = document.getElementById('confirmMessage');

// Password strength elements
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const strengthScore = document.getElementById('strengthScore');

// Password requirement elements
const reqLength = document.getElementById('reqLength');
const reqUppercase = document.getElementById('reqUppercase');
const reqLowercase = document.getElementById('reqLowercase');
const reqNumber = document.getElementById('reqNumber');
const reqSpecial = document.getElementById('reqSpecial');

// Get reset email
const resetEmail = localStorage.getItem('resetEmail');

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
    
    resetForm.insertBefore(msgDiv, resetForm.firstChild);
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 5000);
}

// Check session
function checkSession() {
    if (!resetEmail) {
        showMessage('Session expired. Please request password reset again.', 'error');
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 2000);
        return false;
    }
    return true;
}

// Password strength calculation
function calculatePasswordStrength(password) {
    let strength = 0;
    let checks = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    };
    
    if (password.length >= 8) {
        checks.length = true;
        strength++;
    }
    
    if (/[A-Z]/.test(password)) {
        checks.uppercase = true;
        strength++;
    }
    
    if (/[a-z]/.test(password)) {
        checks.lowercase = true;
        strength++;
    }
    
    if (/[0-9]/.test(password)) {
        checks.number = true;
        strength++;
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        checks.special = true;
        strength++;
    }
    
    return { strength, checks };
}

// Update password requirements UI
function updateRequirements(password) {
    const result = calculatePasswordStrength(password);
    
    updateRequirementItem(reqLength, result.checks.length, 'At least 8 characters');
    updateRequirementItem(reqUppercase, result.checks.uppercase, 'At least 1 uppercase letter (A-Z)');
    updateRequirementItem(reqLowercase, result.checks.lowercase, 'At least 1 lowercase letter (a-z)');
    updateRequirementItem(reqNumber, result.checks.number, 'At least 1 number (0-9)');
    updateRequirementItem(reqSpecial, result.checks.special, 'At least 1 special character (!@#$%^&*)');
    
    return result;
}

function updateRequirementItem(element, isValid, text) {
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
        element.innerHTML = '<i class="fas fa-check-circle"></i> ' + text;
    } else {
        element.classList.add('invalid');
        element.classList.remove('valid');
        element.innerHTML = '<i class="far fa-circle"></i> ' + text;
    }
}

// Update password strength indicator
function updateStrengthIndicator(password) {
    const result = calculatePasswordStrength(password);
    const strength = result.strength;
    
    let level = '';
    let text = '';
    let scoreText = '';
    
    switch(strength) {
        case 0:
        case 1:
            level = 'weak';
            text = 'Weak Password';
            scoreText = '1/5';
            break;
        case 2:
            level = 'weak';
            text = 'Weak Password - Add more requirements';
            scoreText = '2/5';
            break;
        case 3:
            level = 'medium';
            text = 'Medium Password - Could be stronger';
            scoreText = '3/5';
            break;
        case 4:
            level = 'strong';
            text = 'Strong Password!';
            scoreText = '4/5';
            break;
        case 5:
            level = 'very-strong';
            text = 'Very Strong Password! Excellent!';
            scoreText = '5/5';
            break;
        default:
            level = 'weak';
            text = 'Enter a password';
            scoreText = '0/5';
    }
    
    if (password === '') {
        level = 'weak';
        text = 'Enter a password';
        scoreText = '0/5';
        strengthBar.className = 'strength-level';
    } else {
        strengthBar.className = `strength-level ${level}`;
    }
    
    strengthText.className = `strength-text ${level}`;
    strengthText.textContent = text;
    strengthScore.textContent = scoreText;
    
    return result;
}

// Check confirm password match
function checkConfirmPassword() {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        confirmMessage.innerHTML = '';
        confirmMessage.className = 'field-message';
        return false;
    }
    
    if (newPassword !== confirmPassword) {
        confirmMessage.innerHTML = '<i class="fas fa-times-circle"></i> Passwords do not match';
        confirmMessage.className = 'field-message error';
        return false;
    }
    
    confirmMessage.innerHTML = '<i class="fas fa-check-circle"></i> Passwords match';
    confirmMessage.className = 'field-message success';
    return true;
}

// Check if form is valid
function validateFormComplete() {
    const password = newPasswordInput.value;
    const confirm = confirmPasswordInput.value;
    
    const strengthResult = calculatePasswordStrength(password);
    const isPasswordValid = strengthResult.strength >= 3;
    const isConfirmValid = password === confirm && confirm !== '';
    
    const isValid = isPasswordValid && isConfirmValid;
    
    resetBtn.disabled = !isValid;
    return isValid;
}

// Handle password change
function onPasswordChange() {
    const password = newPasswordInput.value;
    updateStrengthIndicator(password);
    updateRequirements(password);
    checkConfirmPassword();
    validateFormComplete();
}

// Toggle password visibility
let isNewPasswordVisible = false;
let isConfirmPasswordVisible = false;

function initPasswordToggles() {
    if (toggleNewPasswordBtn) {
        const monkeySpan = toggleNewPasswordBtn.querySelector('.monkey-icon');
        toggleNewPasswordBtn.addEventListener('click', () => {
            if (!isNewPasswordVisible) {
                newPasswordInput.type = 'text';
                monkeySpan.innerHTML = '🐵';
                isNewPasswordVisible = true;
            } else {
                newPasswordInput.type = 'password';
                monkeySpan.innerHTML = '🙈';
                isNewPasswordVisible = false;
            }
        });
    }
    
    if (toggleConfirmPasswordBtn) {
        const monkeySpan = toggleConfirmPasswordBtn.querySelector('.monkey-icon');
        toggleConfirmPasswordBtn.addEventListener('click', () => {
            if (!isConfirmPasswordVisible) {
                confirmPasswordInput.type = 'text';
                monkeySpan.innerHTML = '🐵';
                isConfirmPasswordVisible = true;
            } else {
                confirmPasswordInput.type = 'password';
                monkeySpan.innerHTML = '🙈';
                isConfirmPasswordVisible = false;
            }
        });
    }
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        resetBtn.classList.add('loading');
        resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting Password...';
        resetBtn.disabled = true;
    } else {
        resetBtn.classList.remove('loading');
        resetBtn.innerHTML = '<i class="fas fa-save"></i> Reset Password';
        resetBtn.disabled = false;
    }
}

// Update user password
function updateUserPassword(email, newPassword) {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        return true;
    }
    return false;
}

// Handle reset password
async function handleResetPassword(event) {
    event.preventDefault();
    
    if (!checkSession()) return;
    
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validate password strength
    const strengthResult = calculatePasswordStrength(newPassword);
    if (strengthResult.strength <= 2) {
        showMessage('Please create a stronger password. Follow the requirements above.', 'warning');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update password
    const updated = updateUserPassword(resetEmail, newPassword);
    
    if (updated) {
        showMessage('✅ Password reset successful! Redirecting to login...', 'success');
        
        // Clear reset session
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetOTP');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        showMessage('Something went wrong. Please try again.', 'error');
        setLoading(false);
    }
}

// Initialize page
function initResetPage() {
    if (!checkSession()) return;
    
    initPasswordToggles();
    
    newPasswordInput.addEventListener('input', onPasswordChange);
    confirmPasswordInput.addEventListener('input', () => {
        checkConfirmPassword();
        validateFormComplete();
    });
    
    resetForm.addEventListener('submit', handleResetPassword);
}

document.addEventListener('DOMContentLoaded', initResetPage);