// register.js - Registration Page with User & Admin Role Selection

// DOM Elements
const registerForm = document.getElementById('userRegisterForm');
const fullnameInput = document.getElementById('fullname');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('termsCheckbox');
const registerBtn = document.getElementById('registerBtn');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmBtn = document.getElementById('toggleConfirmPassword');
const professionSelect = document.getElementById('profession');
const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');

// Admin Fields
const adminFields = document.getElementById('adminFields');
const adminIdInput = document.getElementById('adminId');
const departmentSelect = document.getElementById('department');
const adminLevelSelect = document.getElementById('adminLevel');
const adminCodeInput = document.getElementById('adminCode');

// Role toggle buttons
const userRoleBtn = document.getElementById('userRoleBtn');
const adminRoleBtn = document.getElementById('adminRoleBtn');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');

// Current selected role
let currentRole = 'user';

// Admin secret code
const ADMIN_SECRET_CODE = 'LUMEN_ADMIN_2024';

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

// Message elements
const usernameMessage = document.getElementById('usernameMessage');
const emailMessage = document.getElementById('emailMessage');
const confirmMessage = document.getElementById('confirmMessage');
const adminIdMessage = document.getElementById('adminIdMessage');
const adminCodeMessage = document.getElementById('adminCodeMessage');

// Helper function to get users from localStorage
function getUsers() {
    const stored = localStorage.getItem('registeredUsers');
    if (stored) {
        return JSON.parse(stored);
    }
    const defaultUsers = [
        { fullname: 'Regular User', username: 'user', email: 'user@lumen.com', password: 'password123', profession: 'student', accountType: 'free', role: 'user', registeredAt: new Date().toISOString() },
        { fullname: 'Administrator', username: 'admin', email: 'admin@lumen.com', password: 'admin123', role: 'admin', employeeId: 'EMP-001', department: 'it', adminLevel: 'super', registeredAt: new Date().toISOString() }
    ];
    localStorage.setItem('registeredUsers', JSON.stringify(defaultUsers));
    return defaultUsers;
}

function saveUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Helper function to show message
function showMessage(message, type) {
    const existingMsg = document.querySelector('.error-message, .success-message, .warning-message');
    if (existingMsg) existingMsg.remove();
    
    let icon = '';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    else if (type === 'success') icon = 'fas fa-check-circle';
    else if (type === 'warning') icon = 'fas fa-exclamation-triangle';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `${type}-message`;
    msgDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
    
    registerForm.insertBefore(msgDiv, registerForm.firstChild);
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 4000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

// Username validation
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Check if username exists
function isUsernameTaken(username) {
    const users = getUsers();
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

// Check if email exists
function isEmailTaken(email) {
    const users = getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Check if admin ID exists
function isAdminIdTaken(adminId) {
    const users = getUsers();
    return users.some(user => user.employeeId && user.employeeId.toLowerCase() === adminId.toLowerCase());
}

// Check admin code
function isAdminCodeValid(code) {
    return code === ADMIN_SECRET_CODE;
}

// Role Selection Function
function selectRole(role) {
    currentRole = role;
    
    if (role === 'user') {
        userRoleBtn.classList.add('active');
        adminRoleBtn.classList.remove('active');
        adminFields.style.display = 'none';
        formTitle.innerText = 'Create Account';
        formSubtitle.innerText = 'Join LUMEN for advanced log analysis';
        adminIdInput.removeAttribute('required');
        adminCodeInput.removeAttribute('required');
        if (professionSelect) professionSelect.setAttribute('required', 'required');
    } else {
        adminRoleBtn.classList.add('active');
        userRoleBtn.classList.remove('active');
        adminFields.style.display = 'block';
        formTitle.innerText = 'Admin Registration';
        formSubtitle.innerText = 'Register as an administrator to manage the platform';
        adminIdInput.setAttribute('required', 'required');
        adminCodeInput.setAttribute('required', 'required');
        if (professionSelect) professionSelect.removeAttribute('required');
    }
    validateFormComplete();
}

// Check username availability
function checkUsernameAvailability() {
    const username = usernameInput.value.trim();
    
    if (username === '') {
        usernameMessage.innerHTML = '';
        usernameMessage.className = 'field-message';
        return false;
    }
    
    if (!isValidUsername(username)) {
        usernameMessage.innerHTML = '<i class="fas fa-times-circle"></i> Username must be 3-20 characters (letters, numbers, _ only)';
        usernameMessage.className = 'field-message error';
        return false;
    }
    
    if (isUsernameTaken(username)) {
        usernameMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Username already taken';
        usernameMessage.className = 'field-message error';
        return false;
    }
    
    usernameMessage.innerHTML = '<i class="fas fa-check-circle"></i> Username available';
    usernameMessage.className = 'field-message success';
    return true;
}

// Check email validity
function checkEmailValidity() {
    const email = emailInput.value.trim();
    
    if (email === '') {
        emailMessage.innerHTML = '';
        emailMessage.className = 'field-message';
        return false;
    }
    
    if (!isValidEmail(email)) {
        emailMessage.innerHTML = '<i class="fas fa-times-circle"></i> Please enter a valid email address';
        emailMessage.className = 'field-message error';
        return false;
    }
    
    if (isEmailTaken(email)) {
        emailMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Email already registered. <a href="login.html" style="color: var(--accent);">Login instead?</a>';
        emailMessage.className = 'field-message error';
        return false;
    }
    
    emailMessage.innerHTML = '<i class="fas fa-check-circle"></i> Valid email address';
    emailMessage.className = 'field-message success';
    return true;
}

// Check admin ID availability
function checkAdminIdAvailability() {
    if (currentRole !== 'admin') return true;
    
    const adminId = adminIdInput.value.trim();
    
    if (adminId === '') {
        adminIdMessage.innerHTML = '';
        adminIdMessage.className = 'field-message';
        return false;
    }
    
    if (adminId.length < 3) {
        adminIdMessage.innerHTML = '<i class="fas fa-times-circle"></i> Employee ID must be at least 3 characters';
        adminIdMessage.className = 'field-message error';
        return false;
    }
    
    if (isAdminIdTaken(adminId)) {
        adminIdMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Employee ID already registered';
        adminIdMessage.className = 'field-message error';
        return false;
    }
    
    adminIdMessage.innerHTML = '<i class="fas fa-check-circle"></i> Employee ID available';
    adminIdMessage.className = 'field-message success';
    return true;
}

// Check admin code
function checkAdminCode() {
    if (currentRole !== 'admin') return true;
    
    const code = adminCodeInput.value.trim();
    
    if (code === '') {
        adminCodeMessage.innerHTML = '';
        adminCodeMessage.className = 'field-message';
        return false;
    }
    
    if (!isAdminCodeValid(code)) {
        adminCodeMessage.innerHTML = '<i class="fas fa-times-circle"></i> Invalid admin registration code';
        adminCodeMessage.className = 'field-message error';
        return false;
    }
    
    adminCodeMessage.innerHTML = '<i class="fas fa-check-circle"></i> Valid admin code';
    adminCodeMessage.className = 'field-message success';
    return true;
}

// Password strength calculation
function calculatePasswordStrength(password) {
    let strength = 0;
    let checks = { length: false, uppercase: false, lowercase: false, number: false, special: false };
    
    if (password.length >= 8) { checks.length = true; strength++; }
    if (/[A-Z]/.test(password)) { checks.uppercase = true; strength++; }
    if (/[a-z]/.test(password)) { checks.lowercase = true; strength++; }
    if (/[0-9]/.test(password)) { checks.number = true; strength++; }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) { checks.special = true; strength++; }
    
    return { strength, checks };
}

// Update password requirements
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
    
    let level = '', text = '', scoreText = '';
    
    switch(strength) {
        case 0: case 1: level = 'weak'; text = 'Weak Password'; scoreText = '1/5'; break;
        case 2: level = 'weak'; text = 'Weak Password - Add more requirements'; scoreText = '2/5'; break;
        case 3: level = 'medium'; text = 'Medium Password - Could be stronger'; scoreText = '3/5'; break;
        case 4: level = 'strong'; text = 'Strong Password!'; scoreText = '4/5'; break;
        case 5: level = 'very-strong'; text = 'Very Strong Password! Excellent!'; scoreText = '5/5'; break;
        default: level = 'weak'; text = 'Enter a password'; scoreText = '0/5';
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

// Check confirm password
function checkConfirmPassword() {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    
    if (confirm === '') {
        confirmMessage.innerHTML = '';
        confirmMessage.className = 'field-message';
        return false;
    }
    
    if (password !== confirm) {
        confirmMessage.innerHTML = '<i class="fas fa-times-circle"></i> Passwords do not match';
        confirmMessage.className = 'field-message error';
        return false;
    }
    
    confirmMessage.innerHTML = '<i class="fas fa-check-circle"></i> Passwords match';
    confirmMessage.className = 'field-message success';
    return true;
}

// Validate form complete
function validateFormComplete() {
    const fullname = fullnameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const terms = termsCheckbox.checked;
    
    let isValid = fullname !== '' && 
                  isValidUsername(username) && !isUsernameTaken(username) &&
                  isValidEmail(email) && !isEmailTaken(email) &&
                  calculatePasswordStrength(password).strength >= 3 &&
                  password === confirm && confirm !== '' &&
                  terms;
    
    if (currentRole === 'user') {
        const profession = professionSelect ? professionSelect.value : '';
        isValid = isValid && profession !== '';
    } else {
        const adminIdValid = adminIdInput.value.trim() !== '' && !isAdminIdTaken(adminIdInput.value.trim()) && adminIdInput.value.trim().length >= 3;
        const adminCodeValid = isAdminCodeValid(adminCodeInput.value.trim());
        isValid = isValid && adminIdValid && adminCodeValid;
    }
    
    registerBtn.disabled = !isValid;
    return isValid;
}

// Password change handler
function onPasswordChange() {
    const password = passwordInput.value;
    updateStrengthIndicator(password);
    updateRequirements(password);
    checkConfirmPassword();
    validateFormComplete();
}

// Password toggles
let isPasswordVisible = false;
let isConfirmVisible = false;

function initPasswordToggles() {
    if (togglePasswordBtn) {
        const monkeySpan = togglePasswordBtn.querySelector('.monkey-icon');
        togglePasswordBtn.addEventListener('click', () => {
            if (!isPasswordVisible) {
                passwordInput.type = 'text';
                monkeySpan.innerHTML = '🐵';
                isPasswordVisible = true;
            } else {
                passwordInput.type = 'password';
                monkeySpan.innerHTML = '🙈';
                isPasswordVisible = false;
            }
        });
    }
    
    if (toggleConfirmBtn) {
        const monkeySpan = toggleConfirmBtn.querySelector('.monkey-icon');
        toggleConfirmBtn.addEventListener('click', () => {
            if (!isConfirmVisible) {
                confirmPasswordInput.type = 'text';
                monkeySpan.innerHTML = '🐵';
                isConfirmVisible = true;
            } else {
                confirmPasswordInput.type = 'password';
                monkeySpan.innerHTML = '🙈';
                isConfirmVisible = false;
            }
        });
    }
}

// Modal functions
function openTermsModal() {
    document.getElementById('termsModal')?.classList.remove('hidden');
}
function closeTermsModal() {
    document.getElementById('termsModal')?.classList.add('hidden');
}
function openPrivacyModal() {
    document.getElementById('privacyModal')?.classList.remove('hidden');
}
function closePrivacyModal() {
    document.getElementById('privacyModal')?.classList.add('hidden');
}

function initModals() {
    const termsLink = document.getElementById('termsLink');
    const privacyLink = document.getElementById('privacyLink');
    
    termsLink?.addEventListener('click', (e) => { e.preventDefault(); openTermsModal(); });
    privacyLink?.addEventListener('click', (e) => { e.preventDefault(); openPrivacyModal(); });
    
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('termsModal')) closeTermsModal();
        if (e.target === document.getElementById('privacyModal')) closePrivacyModal();
    });
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    
    const fullname = fullnameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    const strengthResult = calculatePasswordStrength(password);
    if (strengthResult.strength <= 2) {
        showMessage('❌ Please create a stronger password. Follow the requirements above.', 'error');
        return;
    }
    
    registerBtn.classList.add('loading');
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentUsers = getUsers();
    
    if (currentUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        showMessage('❌ Username already taken.', 'error');
        registerBtn.classList.remove('loading');
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
        registerBtn.disabled = false;
        return;
    }
    
    if (currentUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showMessage('❌ Email already registered.', 'error');
        registerBtn.classList.remove('loading');
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
        registerBtn.disabled = false;
        return;
    }
    
    if (currentRole === 'admin') {
        if (!isAdminCodeValid(adminCodeInput.value.trim())) {
            showMessage('❌ Invalid admin registration code', 'error');
            registerBtn.classList.remove('loading');
            registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            registerBtn.disabled = false;
            return;
        }
        
        const newAdmin = {
            fullname, username, email, password,
            role: 'admin',
            employeeId: adminIdInput.value.trim(),
            department: departmentSelect?.value || '',
            adminLevel: adminLevelSelect?.value || '',
            registeredAt: new Date().toISOString()
        };
        currentUsers.push(newAdmin);
        saveUsers(currentUsers);
        showMessage('✅ Admin account created! Redirecting...', 'success');
    } else {
        const profession = professionSelect?.value || '';
        const accountType = document.querySelector('input[name="accountType"]:checked')?.value || 'free';
        
        const newUser = {
            fullname, username, email, password,
            profession, accountType,
            role: 'user',
            registeredAt: new Date().toISOString()
        };
        currentUsers.push(newUser);
        saveUsers(currentUsers);
        showMessage('✅ Account created! Redirecting...', 'success');
    }
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Initialize
function initRegistrationPage() {
    getUsers();
    initPasswordToggles();
    initModals();
    
    // Set default role
    selectRole('user');
    
    usernameInput?.addEventListener('input', () => { checkUsernameAvailability(); validateFormComplete(); });
    emailInput?.addEventListener('input', () => { checkEmailValidity(); validateFormComplete(); });
    adminIdInput?.addEventListener('input', () => { checkAdminIdAvailability(); validateFormComplete(); });
    adminCodeInput?.addEventListener('input', () => { checkAdminCode(); validateFormComplete(); });
    passwordInput?.addEventListener('input', onPasswordChange);
    confirmPasswordInput?.addEventListener('input', () => { checkConfirmPassword(); validateFormComplete(); });
    fullnameInput?.addEventListener('input', validateFormComplete);
    professionSelect?.addEventListener('change', validateFormComplete);
    departmentSelect?.addEventListener('change', validateFormComplete);
    adminLevelSelect?.addEventListener('change', validateFormComplete);
    termsCheckbox?.addEventListener('change', validateFormComplete);
    
    accountTypeRadios?.forEach(radio => radio.addEventListener('change', validateFormComplete));
    
    registerForm?.addEventListener('submit', handleRegister);
}

// Make functions global
window.selectRole = selectRole;
window.closeTermsModal = closeTermsModal;
window.closePrivacyModal = closePrivacyModal;

document.addEventListener('DOMContentLoaded', initRegistrationPage);