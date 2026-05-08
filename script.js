// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== FORM VALIDATION HELPERS =====
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.parentElement.classList.add('error');
        errorElement.parentElement.classList.remove('success');
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.parentElement.classList.remove('error');
        errorElement.parentElement.classList.add('success');
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('.form-group').forEach(el => {
        el.classList.remove('error', 'success');
    });
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// ===== PASSWORD STRENGTH CHECKER =====
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'fair';
    if (strength <= 3) return 'good';
    return 'strong';
}

// ===== UPDATE PASSWORD STRENGTH BAR =====
function updateStrengthBar(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLevel = document.getElementById('strengthLevel');
    
    if (!strengthBar || !strengthLevel) return;
    
    const strength = checkPasswordStrength(password);
    
    // Remove all classes
    strengthBar.classList.remove('weak', 'fair', 'good', 'strong');
    
    if (password.length === 0) {
        strengthLevel.textContent = 'Enter password';
        strengthLevel.style.color = '#888';
        return;
    }
    
    // Add new class
    strengthBar.classList.add(strength);
    
    switch (strength) {
        case 'weak':
            strengthLevel.textContent = 'Weak';
            strengthLevel.style.color = '#dc3545';
            break;
        case 'fair':
            strengthLevel.textContent = 'Fair';
            strengthLevel.style.color = '#fd7e14';
            break;
        case 'good':
            strengthLevel.textContent = 'Good';
            strengthLevel.style.color = '#ffc107';
            break;
        case 'strong':
            strengthLevel.textContent = 'Strong';
            strengthLevel.style.color = '#28a745';
            break;
    }
}

// ===== LOADING BUTTON STATE =====
function setLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// ===== LOGIN FORM VALIDATION =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    // Real-time email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email === '') {
            clearError('emailError');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', '❌ Please enter a valid email address');
        } else {
            clearError('emailError');
        }
    });
    
    // Real-time password validation
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password === '') {
            clearError('passwordError');
            return;
        }
        
        if (password.length < 6) {
            showError('passwordError', '❌ Password must be at least 6 characters');
        } else {
            clearError('passwordError');
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        let hasError = false;
        
        // Validate email
        if (email === '') {
            showError('emailError', '❌ Email is required');
            hasError = true;
        } else if (!isValidEmail(email)) {
            showError('emailError', '❌ Please enter a valid email address');
            hasError = true;
        }
        
        // Validate password
        if (password === '') {
            showError('passwordError', '❌ Password is required');
            hasError = true;
        } else if (password.length < 6) {
            showError('passwordError', '❌ Password must be at least 6 characters');
            hasError = true;
        }
        
        if (hasError) {
            showToast('❌ Please fix the errors', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        setLoading(submitBtn, true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(submitBtn, false);
            showToast('✅ Login successful! Welcome back!', 'success');
            
            // Log form data to console
            console.log('Login Data:', {
                email: email,
                password: password,
                remember: document.querySelector('input[name="remember"]').checked
            });
            
            // Reset form
            loginForm.reset();
            clearAllErrors();
        }, 1500);
    });
}

// ===== REGISTRATION FORM VALIDATION =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    // Real-time name validation
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('input', function() {
        const name = this.value.trim();
        
        if (name === '') {
            clearError('nameError');
            return;
        }
        
        if (name.length < 3) {
            showError('nameError', '❌ Name must be at least 3 characters');
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError('nameError', '❌ Name should only contain letters');
        } else {
            clearError('nameError');
        }
    });
    
    // Real-time email validation
    const regEmailInput = document.getElementById('regEmail');
    regEmailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email === '') {
            clearError('regEmailError');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('regEmailError', '❌ Please enter a valid email address');
        } else {
            clearError('regEmailError');
            
            // Simulate checking if email exists (AJAX demo)
            setTimeout(() => {
                if (email === 'test@test.com') {
                    showError('regEmailError', '❌ This email is already registered');
                }
            }, 500);
        }
    });
    
    // Real-time password validation with strength checker
    const regPasswordInput = document.getElementById('regPassword');
    regPasswordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Update strength bar
        updateStrengthBar(password);
        
        if (password === '') {
            clearError('regPasswordError');
            return;
        }
        
        if (password.length < 6) {
            showError('regPasswordError', '❌ Password must be at least 6 characters');
        } else {
            clearError('regPasswordError');
        }
        
        // Also check confirm password if filled
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (confirmPassword !== '') {
            if (password !== confirmPassword) {
                showError('confirmPasswordError', '❌ Passwords do not match');
            } else {
                clearError('confirmPasswordError');
            }
        }
    });
    
    // Real-time confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    confirmPasswordInput.addEventListener('input', function() {
        const confirmPassword = this.value;
        const password = document.getElementById('regPassword').value;
        
        if (confirmPassword === '') {
            clearError('confirmPasswordError');
            return;
        }
        
        if (confirmPassword !== password) {
            showError('confirmPasswordError', '❌ Passwords do not match');
        } else {
            clearError('confirmPasswordError');
        }
    });
    
    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        let hasError = false;
        
        // Validate name
        if (name === '') {
            showError('nameError', '❌ Name is required');
            hasError = true;
        } else if (name.length < 3) {
            showError('nameError', '❌ Name must be at least 3 characters');
            hasError = true;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError('nameError', '❌ Name should only contain letters');
            hasError = true;
        }
        
        // Validate email
        if (email === '') {
            showError('regEmailError', '❌ Email is required');
            hasError = true;
        } else if (!isValidEmail(email)) {
            showError('regEmailError', '❌ Please enter a valid email address');
            hasError = true;
        }
        
        // Validate password
        if (password === '') {
            showError('regPasswordError', '❌ Password is required');
            hasError = true;
        } else if (password.length < 6) {
            showError('regPasswordError', '❌ Password must be at least 6 characters');
            hasError = true;
        }
        
        // Validate confirm password
        if (confirmPassword === '') {
            showError('confirmPasswordError', '❌ Please confirm your password');
            hasError = true;
        } else if (password !== confirmPassword) {
            showError('confirmPasswordError', '❌ Passwords do not match');
            hasError = true;
        }
        
        // Validate terms
        if (!terms) {
            showError('termsError', '❌ You must accept the Terms & Conditions');
            hasError = true;
        }
        
        if (hasError) {
            showToast('❌ Please fix the errors', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        setLoading(submitBtn, true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(submitBtn, false);
            showToast('✅ Registration successful! Welcome!', 'success');
            
            // Log form data to console
            console.log('Registration Data:', {
                name: name,
                email: email,
                password: password,
                terms: terms
            });
            
            // Reset form
            registerForm.reset();
            clearAllErrors();
            
            // Reset strength bar
            const strengthBar = document.querySelector('.strength-bar');
            if (strengthBar) {
                strengthBar.classList.remove('weak', 'fair', 'good', 'strong');
            }
            const strengthLevel = document.getElementById('strengthLevel');
            if (strengthLevel) {
                strengthLevel.textContent = 'Enter password';
                strengthLevel.style.color = '#888';
            }
        }, 1500);
    });
}

// ===== SOCIAL LOGIN BUTTONS =====
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.querySelector('i').classList.contains('fa-google') ? 'Google' :
                        this.querySelector('i').classList.contains('fa-facebook') ? 'Facebook' :
                        'GitHub';
        showToast('🔗 ' + platform + ' login coming soon!', 'warning');
    });
});

// ===== FORGOT PASSWORD =====
const forgotLink = document.querySelector('.forgot-password');
if (forgotLink) {
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        
        if (email === '') {
            showToast('📧 Please enter your email first', 'warning');
            document.getElementById('email').focus();
        } else if (!isValidEmail(email)) {
            showToast('❌ Please enter a valid email', 'error');
        } else {
            showToast('📧 Password reset link sent to ' + email, 'success');
        }
    });
}

// ===== CONSOLE LOG =====
console.log('✅ Login & Registration System Loaded Successfully!');
console.log('📧 Try submitting the form to see validation in action.');