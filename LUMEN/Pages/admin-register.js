// admin-register.js - Admin Registration Page

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin register page loaded');
    
    // DOM Elements
    const registerForm = document.getElementById('adminRegisterForm');
    const adminIdInput = document.getElementById('adminId');
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const departmentSelect = document.getElementById('department');
    const adminLevelSelect = document.getElementById('adminLevel');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const adminCodeInput = document.getElementById('adminCode');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const registerBtn = document.getElementById('registerBtn');
    
    // Admin secret code
    const ADMIN_SECRET_CODE = 'LUMEN_ADMIN_2024';
    
    // ========== MODAL FUNCTIONS ==========
    window.openTermsModal = function() {
        const modal = document.getElementById('termsModal');
        if (modal) modal.classList.remove('hidden');
    }
    
    window.closeTermsModal = function() {
        const modal = document.getElementById('termsModal');
        if (modal) modal.classList.add('hidden');
    }
    
    window.openPrivacyModal = function() {
        const modal = document.getElementById('privacyModal');
        if (modal) modal.classList.remove('hidden');
    }
    
    window.closePrivacyModal = function() {
        const modal = document.getElementById('privacyModal');
        if (modal) modal.classList.add('hidden');
    }
    
    // Link click handlers for Terms and Privacy
    const showTermsLink = document.getElementById('showTermsLink');
    const showPrivacyLink = document.getElementById('showPrivacyLink');
    
    if (showTermsLink) {
        showTermsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openTermsModal();
        });
    }
    
    if (showPrivacyLink) {
        showPrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openPrivacyModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const termsModal = document.getElementById('termsModal');
        const privacyModal = document.getElementById('privacyModal');
        if (e.target === termsModal) closeTermsModal();
        if (e.target === privacyModal) closePrivacyModal();
    });
    
    // Helper function to get users
    function getUsers() {
        const stored = localStorage.getItem('registeredUsers');
        if (stored) {
            return JSON.parse(stored);
        }
        const defaultUsers = [
            { fullname: 'Regular User', username: 'user', email: 'user@lumen.com', password: 'password123', role: 'user', registeredAt: new Date().toISOString() },
            { fullname: 'Administrator', username: 'admin', email: 'admin@lumen.com', password: 'admin123', role: 'admin', employeeId: 'EMP-001', department: 'it', adminLevel: 'super', registeredAt: new Date().toISOString() }
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
    
    function isAdminIdTaken(adminId) {
        return getUsers().some(u => u.employeeId && u.employeeId.toLowerCase() === adminId.toLowerCase());
    }
    
    function isAdminCodeValid(code) {
        return code === ADMIN_SECRET_CODE;
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
        const adminId = adminIdInput.value.trim();
        const fullname = fullnameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const department = departmentSelect.value;
        const adminLevel = adminLevelSelect.value;
        const password = passwordInput.value;
        const confirm = confirmPasswordInput.value;
        const adminCode = adminCodeInput.value.trim();
        const terms = termsCheckbox.checked;
        
        let isValid = true;
        
        if (!adminId || adminId.length < 3) isValid = false;
        else if (isAdminIdTaken(adminId)) isValid = false;
        else if (!fullname) isValid = false;
        else if (!username || !isValidUsername(username) || isUsernameTaken(username)) isValid = false;
        else if (!email || !isValidEmail(email) || isEmailTaken(email)) isValid = false;
        else if (!department) isValid = false;
        else if (!adminLevel) isValid = false;
        else if (calculatePasswordStrength(password) < 3) isValid = false;
        else if (password !== confirm) isValid = false;
        else if (!isAdminCodeValid(adminCode)) isValid = false;
        else if (!terms) isValid = false;
        
        registerBtn.disabled = !isValid;
        console.log('Form valid:', isValid);
        return isValid;
    }
    
    // Add event listeners for real-time validation
    adminIdInput.addEventListener('input', validateForm);
    fullnameInput.addEventListener('input', validateForm);
    usernameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    departmentSelect.addEventListener('change', validateForm);
    adminLevelSelect.addEventListener('change', validateForm);
    passwordInput.addEventListener('input', validateForm);
    confirmPasswordInput.addEventListener('input', validateForm);
    adminCodeInput.addEventListener('input', validateForm);
    termsCheckbox.addEventListener('change', validateForm);
    
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
    
    // Real-time validation messages
    adminIdInput.addEventListener('input', () => {
        const adminId = adminIdInput.value.trim();
        const msgDiv = document.getElementById('adminIdMessage');
        if (adminId && adminId.length < 3) {
            msgDiv.innerHTML = '<i class="fas fa-times-circle"></i> Employee ID must be at least 3 characters';
            msgDiv.className = 'field-message error';
        } else if (adminId && isAdminIdTaken(adminId)) {
            msgDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Employee ID already registered';
            msgDiv.className = 'field-message error';
        } else if (adminId && adminId.length >= 3) {
            msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Employee ID available';
            msgDiv.className = 'field-message success';
        } else {
            msgDiv.innerHTML = '';
        }
        validateForm();
    });
    
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
    
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const msgDiv = document.getElementById('emailMessage');
        if (email && !isValidEmail(email)) {
            msgDiv.innerHTML = '<i class="fas fa-times-circle"></i> Invalid email address';
            msgDiv.className = 'field-message error';
        } else if (email && isEmailTaken(email)) {
            msgDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Email already registered';
            msgDiv.className = 'field-message error';
        } else if (email && isValidEmail(email)) {
            msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Valid email';
            msgDiv.className = 'field-message success';
        } else {
            msgDiv.innerHTML = '';
        }
        validateForm();
    });
    
    adminCodeInput.addEventListener('input', () => {
        const code = adminCodeInput.value.trim();
        const msgDiv = document.getElementById('adminCodeMessage');
        if (code && !isAdminCodeValid(code)) {
            msgDiv.innerHTML = '<i class="fas fa-times-circle"></i> Invalid admin code';
            msgDiv.className = 'field-message error';
        } else if (code && isAdminCodeValid(code)) {
            msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Valid admin code';
            msgDiv.className = 'field-message success';
        } else {
            msgDiv.innerHTML = '';
        }
        validateForm();
    });
    
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
    
    // Password strength indicator
    function updateStrengthIndicator() {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        const strengthScore = document.getElementById('strengthScore');
        
        let level = '', text = '', scoreText = '';
        
        if (password === '') {
            level = 'weak';
            text = 'Enter a password';
            scoreText = '0/5';
        } else if (strength <= 2) {
            level = 'weak';
            text = 'Weak Password';
            scoreText = `${strength}/5`;
        } else if (strength === 3) {
            level = 'medium';
            text = 'Medium Password';
            scoreText = '3/5';
        } else if (strength === 4) {
            level = 'strong';
            text = 'Strong Password!';
            scoreText = '4/5';
        } else {
            level = 'very-strong';
            text = 'Very Strong Password! Excellent!';
            scoreText = '5/5';
        }
        
        strengthBar.className = `strength-level ${level}`;
        strengthText.className = `strength-text ${level}`;
        strengthText.textContent = text;
        strengthScore.textContent = scoreText;
        
        // Update requirement checkmarks
        const reqLength = document.getElementById('reqLength');
        const reqUppercase = document.getElementById('reqUppercase');
        const reqLowercase = document.getElementById('reqLowercase');
        const reqNumber = document.getElementById('reqNumber');
        const reqSpecial = document.getElementById('reqSpecial');
        
        if (reqLength) {
            reqLength.innerHTML = password.length >= 8 ? '<i class="fas fa-check-circle"></i> At least 8 characters' : '<i class="far fa-circle"></i> At least 8 characters';
            reqLength.className = password.length >= 8 ? 'valid' : 'invalid';
        }
        if (reqUppercase) {
            reqUppercase.innerHTML = /[A-Z]/.test(password) ? '<i class="fas fa-check-circle"></i> At least 1 uppercase letter (A-Z)' : '<i class="far fa-circle"></i> At least 1 uppercase letter (A-Z)';
            reqUppercase.className = /[A-Z]/.test(password) ? 'valid' : 'invalid';
        }
        if (reqLowercase) {
            reqLowercase.innerHTML = /[a-z]/.test(password) ? '<i class="fas fa-check-circle"></i> At least 1 lowercase letter (a-z)' : '<i class="far fa-circle"></i> At least 1 lowercase letter (a-z)';
            reqLowercase.className = /[a-z]/.test(password) ? 'valid' : 'invalid';
        }
        if (reqNumber) {
            reqNumber.innerHTML = /[0-9]/.test(password) ? '<i class="fas fa-check-circle"></i> At least 1 number (0-9)' : '<i class="far fa-circle"></i> At least 1 number (0-9)';
            reqNumber.className = /[0-9]/.test(password) ? 'valid' : 'invalid';
        }
        if (reqSpecial) {
            reqSpecial.innerHTML = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? '<i class="fas fa-check-circle"></i> At least 1 special character (!@#$%^&*)' : '<i class="far fa-circle"></i> At least 1 special character (!@#$%^&*)';
            reqSpecial.className = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid';
        }
    }
    
    passwordInput.addEventListener('input', updateStrengthIndicator);
    
    // Handle form submission
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Form submitted!');
        
        const adminId = adminIdInput.value.trim();
        const fullname = fullnameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const department = departmentSelect.value;
        const adminLevel = adminLevelSelect.value;
        const password = passwordInput.value;
        const adminCode = adminCodeInput.value.trim();
        
        // Final validation
        if (!adminId) { showMessage('❌ Please enter Employee ID', 'error'); return; }
        if (!fullname) { showMessage('❌ Please enter Full Name', 'error'); return; }
        if (!username) { showMessage('❌ Please enter Username', 'error'); return; }
        if (!email) { showMessage('❌ Please enter Email', 'error'); return; }
        if (!department) { showMessage('❌ Please select Department', 'error'); return; }
        if (!adminLevel) { showMessage('❌ Please select Admin Level', 'error'); return; }
        if (!password) { showMessage('❌ Please enter Password', 'error'); return; }
        if (!adminCode) { showMessage('❌ Please enter Admin Registration Code', 'error'); return; }
        
        if (!isAdminCodeValid(adminCode)) {
            showMessage('❌ Invalid admin registration code', 'error');
            return;
        }
        
        if (calculatePasswordStrength(password) < 3) {
            showMessage('❌ Please create a stronger password', 'error');
            return;
        }
        
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Admin Account...';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const currentUsers = getUsers();
        
        if (currentUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            showMessage('❌ Username already taken', 'error');
            registerBtn.disabled = false;
            registerBtn.innerHTML = '<i class="fas fa-user-shield"></i> Register as Admin';
            return;
        }
        
        if (currentUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            showMessage('❌ Email already registered', 'error');
            registerBtn.disabled = false;
            registerBtn.innerHTML = '<i class="fas fa-user-shield"></i> Register as Admin';
            return;
        }
        
        const newAdmin = {
            employeeId: adminId,
            fullname: fullname,
            username: username,
            email: email,
            password: password,
            department: department,
            adminLevel: adminLevel,
            role: 'admin',
            registeredAt: new Date().toISOString()
        };
        
        currentUsers.push(newAdmin);
        saveUsers(currentUsers);
        
        console.log('✅ Admin registered:', newAdmin);
        
        showMessage('✅ Admin account created! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
    
    // Initial validation to disable button until fields filled
    validateForm();
});