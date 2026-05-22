// login-auth.js - Login Page Specific Authentication

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const rememberCheckbox = document.getElementById('rememberMe');
const togglePasswordBtn = document.getElementById('togglePassword');
const roleRadios = document.querySelectorAll('input[name="loginRole"]');

// Get registered users from localStorage
function getRegisteredUsers() {
    const users = localStorage.getItem('registeredUsers');
    if (users) {
        return JSON.parse(users);
    }
    // Return default demo users if none exist
    return [
        { fullname: 'Regular User', username: 'user', email: 'user@lumen.com', password: 'password123', profession: 'student', accountType: 'free', role: 'user', registeredAt: new Date().toISOString() },
        { fullname: 'Administrator', username: 'admin', email: 'admin@lumen.com', password: 'admin123', profession: 'it_manager', accountType: 'premium', role: 'admin', registeredAt: new Date().toISOString() },
        { fullname: 'Sadia Tabassum', username: 'sadia', email: 'sadia@lumen.com', password: 'sadia123', profession: 'security_analyst', accountType: 'premium', role: 'user', registeredAt: new Date().toISOString() },
        { fullname: 'Md Ratul Ryhan Rafi', username: 'ratul', email: 'ratul@lumen.com', password: 'ratul123', profession: 'network_engineer', accountType: 'free', role: 'user', registeredAt: new Date().toISOString() }
    ];
}

// Save registered users back to localStorage
function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Find user by username or email AND role
function findUser(identifier, password, selectedRole) {
    const users = getRegisteredUsers();
    
    // Find by username or email (case insensitive)
    const user = users.find(u => 
        (u.username.toLowerCase() === identifier.toLowerCase() || 
         u.email.toLowerCase() === identifier.toLowerCase()) &&
        u.role === selectedRole
    );
    
    if (!user) {
        // Check if user exists but with wrong role
        const userExists = users.find(u => 
            u.username.toLowerCase() === identifier.toLowerCase() || 
            u.email.toLowerCase() === identifier.toLowerCase()
        );
        
        if (userExists && userExists.role !== selectedRole) {
            return { success: false, error: 'wrong_role', userRole: userExists.role };
        }
        return { success: false, error: 'no_account' };
    }
    
    if (user.password !== password) {
        return { success: false, error: 'wrong_password' };
    }
    
    return { success: true, user: user };
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
    
    if (type === 'error' && message.includes('Account not found')) {
        msgDiv.innerHTML = `<i class="${icon}"></i> ${message} <a href="register.html" style="color: var(--accent); text-decoration: underline;">Create an account</a>`;
    } else {
        msgDiv.innerHTML = `<i class="${icon}"></i> ${message}`;
    }
    
    loginForm.insertBefore(msgDiv, loginForm.firstChild);
    
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 4000);
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        loginBtn.classList.add('loading');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        loginBtn.disabled = true;
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
        loginBtn.disabled = false;
    }
}

// Save credentials if "Remember Me" is checked
function saveCredentials(identifier, password) {
    if (rememberCheckbox.checked) {
        localStorage.setItem('savedUsername', identifier);
        localStorage.setItem('savedPassword', btoa(password));
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
        localStorage.removeItem('rememberMe');
    }
}

// Load saved credentials
function loadSavedCredentials() {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
        const savedUsername = localStorage.getItem('savedUsername');
        const savedPassword = localStorage.getItem('savedPassword');
        
        if (savedUsername) usernameInput.value = savedUsername;
        if (savedPassword) passwordInput.value = atob(savedPassword);
        
        rememberCheckbox.checked = true;
    }
}

// Monkey eye toggle
let isPasswordVisible = false;
function initPasswordToggle() {
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
}

// Validate form inputs
function validateForm(identifier, password) {
    if (!identifier || identifier.trim() === '') {
        showMessage('Please enter your username or email address', 'warning');
        return false;
    }
    
    if (!password || password.trim() === '') {
        showMessage('Please enter your password', 'warning');
        return false;
    }
    
    return true;
}

// Clear error styling when user types
function clearErrorOnType() {
    usernameInput.addEventListener('input', () => {
        usernameInput.style.borderColor = '';
        const errorMsg = document.querySelector('.error-message');
        if (errorMsg && errorMsg.innerText.includes('Account not found')) {
            errorMsg.remove();
        }
    });
    
    passwordInput.addEventListener('input', () => {
        passwordInput.style.borderColor = '';
        const errorMsg = document.querySelector('.error-message');
        if (errorMsg && errorMsg.innerText.includes('Incorrect password')) {
            errorMsg.remove();
        }
    });
}

// Get selected role
function getSelectedRole() {
    let selectedRole = 'user';
    roleRadios.forEach(radio => {
        if (radio.checked) {
            selectedRole = radio.value;
        }
    });
    return selectedRole;
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const identifier = usernameInput.value.trim();
    const password = passwordInput.value;
    const selectedRole = getSelectedRole();
    
    // Validate form
    if (!validateForm(identifier, password)) return;
    
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user
    const result = findUser(identifier, password, selectedRole);
    
    if (result.success) {
        const user = result.user;
        const userData = {
            username: user.username,
            email: user.email,
            role: user.role,
            name: user.fullname || user.username,
            profession: user.profession,
            accountType: user.accountType,
            loggedInAt: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userData));
        saveCredentials(identifier, password);
        showMessage(`Welcome back, ${userData.name}! Redirecting...`, 'success');
        
        setTimeout(() => {
            if (userData.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1000);
        
    } else {
        if (result.error === 'no_account') {
            showMessage('Account not found. ', 'error');
            usernameInput.style.borderColor = '#f44336';
            setTimeout(() => {
                usernameInput.style.borderColor = '';
            }, 3000);
        } else if (result.error === 'wrong_role') {
            showMessage(`This account is registered as ${result.userRole}. Please select the correct role to login.`, 'error');
        } else if (result.error === 'wrong_password') {
            showMessage('Incorrect password. Please try again.', 'error');
            passwordInput.style.borderColor = '#f44336';
            setTimeout(() => {
                passwordInput.style.borderColor = '';
            }, 3000);
            passwordInput.value = '';
        }
        setLoading(false);
    }
}

// Check if already logged in
function checkAlreadyLoggedIn() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        console.log(`Already logged in as: ${userData.username} (${userData.role})`);
    }
}

// Initialize login page
function initLoginPage() {
    loadSavedCredentials();
    initPasswordToggle();
    clearErrorOnType();
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    checkAlreadyLoggedIn();
    
    // Debug: Show registered users in console
    const users = getRegisteredUsers();
    console.log('Available users:', users.map(u => ({ username: u.username, email: u.email, role: u.role })));
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initLoginPage);