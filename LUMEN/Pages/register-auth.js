// register-auth.js - User Registration Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('User registration page loaded');
    
    // DOM Elements
    const registerForm = document.getElementById('userRegisterForm');
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const professionSelect = document.getElementById('profession');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const registerBtn = document.getElementById('registerBtn');
    
    // Modal elements
    const termsModal = document.getElementById('termsModal');
    const privacyModal = document.getElementById('privacyModal');
    const showTermsLink = document.getElementById('showTermsLink');
    const showPrivacyLink = document.getElementById('showPrivacyLink');
    
    // Modal functions
    window.openTermsModal = function() {
        if (termsModal) termsModal.classList.remove('hidden');
    }
    
    window.closeTermsModal = function() {
        if (termsModal) termsModal.classList.add('hidden');
    }
    
    window.openPrivacyModal = function() {
        if (privacyModal) privacyModal.classList.remove('hidden');
    }
    
    window.closePrivacyModal = function() {
        if (privacyModal) privacyModal.classList.add('hidden');
    }
    
    // Link click handlers
    if (showTermsLink) {
        showTermsLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.openTermsModal();
        });
    }
    
    if (showPrivacyLink) {
        showPrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.openPrivacyModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === termsModal) window.closeTermsModal();
        if (e.target === privacyModal) window.closePrivacyModal();
    });
    
    // Helper functions
    function getUsers() {
        const stored = localStorage.getItem('registeredUsers');
        if (stored) return JSON.parse(stored);
        const defaultUsers = [
            { fullname: 'Regular User', username: 'user', email: 'user@lumen.com', password: 'password123', role: 'user', registeredAt: new Date().toISOString() },
            { fullname: 'Administrator', username: 'admin', email: 'admin@lumen.com', password: 'admin123', role: 'admin', registeredAt: new Date().toISOString() }
        ];
        localStorage.setItem('registeredUsers', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    
    function saveUsers(users) {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
    
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
    
    function isValidEmail(email) {
        return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
    }
    
    function isValidUsername(username) {
        return /^[a-zA-Z0-9_]{3,20}$/.test(username);
    }
    
    function isUsernameTaken(username) {
        return getUsers().some(u => u.username.toLowerCase() === username.toLowerCase());
    }
    
    function isEmailTaken(email) {
        return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        return strength;
    }
    
    function validateForm() {
        const fullname = fullnameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmPasswordInput.value;
        const terms = termsCheckbox.checked;
        
        let isValid = true;
        if (!fullname) isValid = false;
        else if (!username || !isValidUsername(username) || isUsernameTaken(username)) isValid = false;
        else if (!email || !isValidEmail(email) || isEmailTaken(email)) isValid = false;
        else if (calculatePasswordStrength(password) < 3) isValid = false;
        else if (password !== confirm) isValid = false;
        else if (!terms) isValid = false;
        
        registerBtn.disabled = !isValid;
        return isValid;
    }
    
    // Event listeners
    fullnameInput.addEventListener('input', validateForm);
    usernameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    confirmPasswordInput.addEventListener('input', validateForm);
    termsCheckbox.addEventListener('change', validateForm);
    professionSelect.addEventListener('change', validateForm);
    
    // Username availability
    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value.trim();
        const msgDiv = document.getElementById('usernameMessage');
        if (username && !isValidUsername(username)) {
            msgDiv.innerHTML = '<i class="fas fa-times-circle"></i> Username must be 3-20 characters (letters, numbers, _ only)';
            msgDiv.className = 'field-message error';
        } else if (username && isUsernameTaken(username)) {
            msgDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Username already taken';
            msgDiv.className = 'field-message error';
        } else if (username && isValidUsername(username)) {
            msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Username available';
            msgDiv.className = 'field-message success';
        } else {
            msgDiv.innerHTML = '';
        }
        validateForm();
    });
    
    // Email validation
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const msgDiv = document.getElementById('emailMessage');
        if (email && !isValidEmail(email)) {
            msgDiv.innerHTML = '<i class="fas fa-times-circle"></i> Please enter a valid email address';
            msgDiv.className = 'field-message error';
        } else if (email && isEmailTaken(email)) {
            msgDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Email already registered';
            msgDiv.className = 'field-message error';
        } else if (email && isValidEmail(email)) {
            msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Valid email address';
            msgDiv.className = 'field-message success';
        } else {
            msgDiv.innerHTML = '';
        }
        validateForm();
    });
    
    // Confirm password check
    confirmPasswordInput.addEventListener('input', () => {
        const msgDiv = document.getElementById('confirmMessage');
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            msgDiv.innerHTML = '<i class="fas fa-times-circle"></i> Passwords do not match';
            msgDiv.className = 'field-message error';
        } else if (confirmPasswordInput.value && passwordInput.value === confirmPasswordInput.value) {
            msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Passwords match';
            msgDiv.className = 'field-message success';
        } else {
            msgDiv.innerHTML = '';
        }
        validateForm();
    });
    
    // Password strength
    function updateStrengthIndicator() {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        const strengthScore = document.getElementById('strengthScore');
        
        let level = '', text = '', scoreText = '';
        if (password === '') {
            level = 'weak'; text = 'Enter a password'; scoreText = '0/5';
        } else if (strength <= 2) {
            level = 'weak'; text = 'Weak Password'; scoreText = `${strength}/5`;
        } else if (strength === 3) {
            level = 'medium'; text = 'Medium Password'; scoreText = '3/5';
        } else if (strength === 4) {
            level = 'strong'; text = 'Strong Password!'; scoreText = '4/5';
        } else {
            level = 'very-strong'; text = 'Very Strong Password!'; scoreText = '5/5';
        }
        
        strengthBar.className = `strength-level ${level}`;
        strengthText.className = `strength-text ${level}`;
        strengthText.textContent = text;
        strengthScore.textContent = scoreText;
        
        const requirements = [
            { id: 'reqLength', check: password.length >= 8, text: 'At least 8 characters' },
            { id: 'reqUppercase', check: /[A-Z]/.test(password), text: 'At least 1 uppercase letter (A-Z)' },
            { id: 'reqLowercase', check: /[a-z]/.test(password), text: 'At least 1 lowercase letter (a-z)' },
            { id: 'reqNumber', check: /[0-9]/.test(password), text: 'At least 1 number (0-9)' },
            { id: 'reqSpecial', check: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'At least 1 special character (!@#$%^&*)' }
        ];
        
        requirements.forEach(req => {
            const element = document.getElementById(req.id);
            if (element) {
                if (req.check) {
                    element.innerHTML = `<i class="fas fa-check-circle"></i> ${req.text}`;
                    element.className = 'valid';
                } else {
                    element.innerHTML = `<i class="far fa-circle"></i> ${req.text}`;
                    element.className = 'invalid';
                }
            }
        });
        
        validateForm();
    }
    
    passwordInput.addEventListener('input', updateStrengthIndicator);
    
    // Password toggle
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmBtn = document.getElementById('toggleConfirmPassword');
    let isPasswordVisible = false;
    let isConfirmVisible = false;
    
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const monkeySpan = togglePasswordBtn.querySelector('.monkey-icon');
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
        toggleConfirmBtn.addEventListener('click', () => {
            const monkeySpan = toggleConfirmBtn.querySelector('.monkey-icon');
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
    
    // Form submission
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const fullname = fullnameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const profession = professionSelect ? professionSelect.value : '';
        const accountType = document.querySelector('input[name="accountType"]:checked')?.value || 'free';
        
        if (!fullname) { showMessage('Please enter your full name', 'error'); return; }
        if (!username) { showMessage('Please enter a username', 'error'); return; }
        if (!email) { showMessage('Please enter your email', 'error'); return; }
        if (!password) { showMessage('Please enter a password', 'error'); return; }
        
        if (calculatePasswordStrength(password) < 3) {
            showMessage('Please create a stronger password', 'error');
            return;
        }
        
        if (password !== confirmPasswordInput.value) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (!termsCheckbox.checked) {
            showMessage('Please agree to the Terms and Privacy Policy', 'error');
            return;
        }
        
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const currentUsers = getUsers();
        
        if (currentUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            showMessage('Username already taken', 'error');
            registerBtn.disabled = false;
            registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            return;
        }
        
        if (currentUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            showMessage('Email already registered', 'error');
            registerBtn.disabled = false;
            registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            return;
        }
        
        const newUser = {
            fullname: fullname, username: username, email: email, password: password,
            profession: profession, accountType: accountType, role: 'user',
            registeredAt: new Date().toISOString()
        };
        
        currentUsers.push(newUser);
        saveUsers(currentUsers);
        
        showMessage('Account created successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
    
    validateForm();
});