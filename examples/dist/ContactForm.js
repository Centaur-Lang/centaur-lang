/**
 * @centaur-generated true
 * @centaur-version 0.1.0
 * @component ContactForm
 * @human Chris Conen - specification, intent
 * @ai Claude - implementation
 * @timestamp 2025-12-27T06:20:43.224Z
 */

/**
 * CENTAUR LANG Generated JavaScript
 * Component: ContactForm
 * Auto-generated validation and interaction handlers
 */

(function() {
    'use strict';

    // ============================================
    // FORM HANDLER
    // ============================================
    
    const form = document.getElementById('centaurForm');
    const toast = document.getElementById('toast');
    
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        setLoading(true);
        
        // Simulate API call (1 second delay)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success!
        setLoading(false);
        showToast('Message sent successfully!');
        form.reset();
    }

    // ============================================
    // VALIDATION
    // ============================================
    
    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            // Required validation
            if (field.hasAttribute('required') && !field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
                return;
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                    return;
                }
            }
            
            // Min length validation
            if (field.minLength > 0 && field.value.length < field.minLength) {
                showError(field, `Minimum ${field.minLength} characters required`);
                isValid = false;
                return;
            }
        });
        
        return isValid;
    }

    // ============================================
    // UI HELPERS
    // ============================================
    
    function showError(field, message) {
        const group = field.closest('.form-group');
        if (group) {
            group.classList.add('has-error');
            const errorEl = group.querySelector('.error-message');
            if (errorEl) {
                errorEl.textContent = message;
            }
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
            const errorEl = group.querySelector('.error-message');
            if (errorEl) {
                errorEl.textContent = '';
            }
        });
    }
    
    function setLoading(loading) {
        const button = form.querySelector('.submit-button');
        const buttonText = button.querySelector('.button-text');
        const buttonLoading = button.querySelector('.button-loading');
        
        button.disabled = loading;
        buttonText.style.display = loading ? 'none' : 'inline';
        buttonLoading.style.display = loading ? 'inline' : 'none';
    }
    
    function showToast(message, duration = 3000) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

})();
