/**
 * CENTAUR LANG Compiler v0.1.0
 * 
 * @centaur-generated false
 * @human Chris Conen - vision, specification
 * @ai Claude - full implementation
 * @timestamp 2025-12-26
 * 
 * The world's first Human+AI programming language compiler.
 * Transforms natural language intent into production-ready code.
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CENTAUR LANG COMPILER
// ============================================================

class CentaurCompiler {
    constructor(options = {}) {
        this.version = '0.1.0';
        this.options = {
            outputDir: options.outputDir || './dist',
            humanAuthor: options.humanAuthor || 'Human',
            aiAuthor: options.aiAuthor || 'Claude',
            ...options
        };
        
        // Theme definitions
        this.themes = {
            dark: {
                background: '#1a1a1a',
                surface: '#2d2d2d',
                text: '#ffffff',
                textMuted: '#a0a0a0',
                border: '#404040'
            },
            light: {
                background: '#ffffff',
                surface: '#f5f5f5',
                text: '#1a1a1a',
                textMuted: '#666666',
                border: '#e0e0e0'
            },
            glass: {
                background: 'rgba(255, 255, 255, 0.1)',
                surface: 'rgba(255, 255, 255, 0.2)',
                text: '#ffffff',
                textMuted: 'rgba(255, 255, 255, 0.7)',
                border: 'rgba(255, 255, 255, 0.3)'
            }
        };
        
        // Accent color definitions
        this.accents = {
            gold: '#C9A227',
            emerald: '#00C853',
            coral: '#FF6B6B',
            azure: '#0088FF',
            purple: '#9C27B0',
            teal: '#00BCD4'
        };
    }

    // --------------------------------------------------------
    // PARSER: Parse .centaur file into AST
    // --------------------------------------------------------
    parse(source) {
        const lines = source.split('\n');
        const ast = {
            directives: {},
            intent: [],
            raw: source
        };

        let inIntentBlock = false;
        let intentBuffer = [];

        for (const line of lines) {
            const trimmed = line.trim();
            
            // Skip empty lines and comments
            if (!trimmed || trimmed.startsWith('//')) continue;
            
            // Parse directives (@)
            if (trimmed.startsWith('@')) {
                const match = trimmed.match(/@(\w+)\s*(.*)/);
                if (match) {
                    const [, directive, value] = match;
                    ast.directives[directive] = value.trim() || true;
                }
                continue;
            }
            
            // Track intent blocks
            if (trimmed === '{') {
                inIntentBlock = true;
                continue;
            }
            if (trimmed === '}') {
                inIntentBlock = false;
                ast.intent = this.parseIntent(intentBuffer.join('\n'));
                intentBuffer = [];
                continue;
            }
            
            if (inIntentBlock) {
                intentBuffer.push(trimmed);
            }
        }

        return ast;
    }

    // --------------------------------------------------------
    // INTENT PARSER: Convert natural language to structured data
    // --------------------------------------------------------
    parseIntent(intentText) {
        const intent = {
            fields: [],
            styling: [],
            behavior: [],
            button: null,
            raw: intentText
        };

        const lines = intentText.split('\n');
        let currentSection = 'general';

        // First, try to find button text in the whole intent
        intent.button = this.parseButtonFromIntent(intentText);

        for (const line of lines) {
            const lower = line.toLowerCase();
            
            // Detect sections
            if (lower.includes('field') && lower.includes(':')) {
                currentSection = 'fields';
                continue;
            }
            if (lower.includes('styling') || lower.includes('style')) {
                currentSection = 'styling';
                continue;
            }
            if (lower.includes('behavior') || lower.includes('when')) {
                currentSection = 'behavior';
                continue;
            }
            if ((lower.includes('submit button') || lower.includes('button:')) && !lower.includes('disable')) {
                currentSection = 'button';
                // Try to extract button text from this line
                const match = line.match(/["']([^"']+)["']/);
                if (match) {
                    intent.button = { text: match[1], type: 'submit' };
                }
                continue;
            }

            // Parse list items
            if (line.trim().startsWith('-')) {
                const content = line.replace(/^[\s-]+/, '').trim();
                
                if (currentSection === 'fields') {
                    intent.fields.push(this.parseField(content));
                } else if (currentSection === 'styling') {
                    intent.styling.push(content);
                } else if (currentSection === 'behavior') {
                    intent.behavior.push(content);
                } else if (currentSection === 'button') {
                    // Check for text in button section
                    const match = content.match(/["']([^"']+)["']/);
                    if (match) {
                        intent.button = { text: match[1], type: 'submit' };
                    }
                }
            }
        }

        return intent;
    }

    // --------------------------------------------------------
    // FIELD PARSER: Parse field definitions
    // --------------------------------------------------------
    parseField(fieldText) {
        const field = {
            type: 'text',
            name: '',
            required: false,
            validate: null,
            placeholder: '',
            options: []
        };

        const lower = fieldText.toLowerCase();

        // Detect field type
        if (lower.includes('email')) {
            field.type = 'email';
            field.name = 'email';
            field.validate = 'email';
        } else if (lower.includes('name')) {
            field.type = 'text';
            field.name = 'name';
        } else if (lower.includes('message') || lower.includes('textarea')) {
            field.type = 'textarea';
            field.name = 'message';
        } else if (lower.includes('dropdown') || lower.includes('select')) {
            field.type = 'select';
            // Extract options
            const optionsMatch = fieldText.match(/options?[:\s]+([^)]+)/i);
            if (optionsMatch) {
                field.options = optionsMatch[1].split(',').map(o => o.trim());
            }
            field.name = 'select';
        } else if (lower.includes('subject')) {
            field.type = 'select';
            field.name = 'subject';
        } else if (lower.includes('phone')) {
            field.type = 'tel';
            field.name = 'phone';
        }

        // Check required
        if (lower.includes('required')) {
            field.required = true;
        }

        // Extract placeholder
        const placeholderMatch = fieldText.match(/placeholder[:\s]+["']([^"']+)["']/i);
        if (placeholderMatch) {
            field.placeholder = placeholderMatch[1];
        }

        // Extract validation
        if (lower.includes('validate email') || lower.includes('email format')) {
            field.validate = 'email';
        }
        if (lower.includes('min')) {
            const minMatch = fieldText.match(/min\s*(\d+)/i);
            if (minMatch) {
                field.minLength = parseInt(minMatch[1]);
            }
        }

        return field;
    }

    // --------------------------------------------------------
    // BUTTON PARSER
    // --------------------------------------------------------
    parseButton(buttonText) {
        const button = {
            text: 'Submit',
            type: 'submit'
        };

        // Look for text in quotes
        const textMatch = buttonText.match(/["']([^"']+)["']/);
        if (textMatch) {
            button.text = textMatch[1];
        } else if (buttonText.toLowerCase().includes('text:')) {
            // Handle "Text: Send Message" format
            const parts = buttonText.split(/text:\s*/i);
            if (parts[1]) {
                button.text = parts[1].trim().replace(/["']/g, '');
            }
        }

        return button;
    }

    // --------------------------------------------------------
    // ENHANCED INTENT PARSER - Better button detection
    // --------------------------------------------------------
    parseButtonFromIntent(intentText) {
        const lines = intentText.split('\n');
        for (const line of lines) {
            const lower = line.toLowerCase();
            // Match patterns like: Submit button: "Send Message" or Button text: "Submit"
            if (lower.includes('button') && (lower.includes('text') || line.includes('"') || line.includes("'"))) {
                const match = line.match(/["']([^"']+)["']/);
                if (match) {
                    return { text: match[1], type: 'submit' };
                }
            }
            // Match: - Text: "Send Message"
            if (lower.includes('text:') && (line.includes('"') || line.includes("'"))) {
                const match = line.match(/["']([^"']+)["']/);
                if (match) {
                    return { text: match[1], type: 'submit' };
                }
            }
        }
        return { text: 'Submit', type: 'submit' };
    }

    // --------------------------------------------------------
    // CODE GENERATOR: Generate HTML
    // --------------------------------------------------------
    generateHTML(ast) {
        const component = ast.directives.component || 'Component';
        const theme = this.themes[ast.directives.theme] || this.themes.dark;
        const accent = this.accents[ast.directives.accent] || this.accents.gold;
        
        let html = this.getHACPComment(component);
        
        html += `<!DOCTYPE html>
<html lang="${ast.directives.language || 'en'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component} | CENTAUR Generated</title>
    <link rel="stylesheet" href="${component}.css">
</head>
<body>
`;

        // Generate based on component type
        if (component.toLowerCase().includes('form')) {
            html += this.generateFormHTML(ast, theme, accent);
        } else if (component.toLowerCase().includes('hero')) {
            html += this.generateHeroHTML(ast, theme, accent);
        } else if (component.toLowerCase().includes('nav')) {
            html += this.generateNavHTML(ast, theme, accent);
        } else {
            html += this.generateGenericHTML(ast, theme, accent);
        }

        html += `
    <script src="${component}.js"></script>
</body>
</html>`;

        return html;
    }

    // --------------------------------------------------------
    // FORM HTML GENERATOR
    // --------------------------------------------------------
    generateFormHTML(ast, theme, accent) {
        const intent = ast.intent;
        const fields = intent.fields || [];
        const button = intent.button || { text: 'Submit' };

        let html = `    <div class="centaur-form-container">
        <form class="centaur-form" id="centaurForm" novalidate>
`;

        for (const field of fields) {
            const id = `field-${field.name}`;
            const requiredAttr = field.required ? 'required' : '';
            const placeholder = field.placeholder || this.generatePlaceholder(field);

            html += `            <div class="form-group">
                <label for="${id}">${this.capitalize(field.name)}${field.required ? ' *' : ''}</label>
`;

            if (field.type === 'textarea') {
                html += `                <textarea 
                    id="${id}" 
                    name="${field.name}" 
                    placeholder="${placeholder}"
                    ${requiredAttr}
                    ${field.minLength ? `minlength="${field.minLength}"` : ''}
                ></textarea>
`;
            } else if (field.type === 'select') {
                html += `                <select id="${id}" name="${field.name}" ${requiredAttr}>
                    <option value="">Select ${this.capitalize(field.name)}</option>
`;
                for (const option of (field.options.length ? field.options : ['General', 'Support', 'Partnership'])) {
                    html += `                    <option value="${option.toLowerCase()}">${option}</option>
`;
                }
                html += `                </select>
`;
            } else {
                html += `                <input 
                    type="${field.type}" 
                    id="${id}" 
                    name="${field.name}" 
                    placeholder="${placeholder}"
                    ${requiredAttr}
                />
`;
            }

            html += `                <span class="error-message" id="${id}-error"></span>
            </div>
`;
        }

        html += `            <button type="submit" class="submit-button">
                <span class="button-text">${button.text}</span>
                <span class="button-loading" style="display: none;">Sending...</span>
            </button>
        </form>
        
        <div class="toast" id="toast"></div>
    </div>
`;

        return html;
    }

    // --------------------------------------------------------
    // CSS GENERATOR
    // --------------------------------------------------------
    generateCSS(ast) {
        const theme = this.themes[ast.directives.theme] || this.themes.dark;
        const accent = this.accents[ast.directives.accent] || this.accents.gold;
        const responsive = ast.directives.responsive === 'true' || ast.directives.responsive === true;

        let css = this.getHACPComment(ast.directives.component, 'css');

        css += `
/* ============================================
   CENTAUR LANG Generated Styles
   Theme: ${ast.directives.theme || 'dark'}
   Accent: ${ast.directives.accent || 'gold'}
   ============================================ */

:root {
    --bg-primary: ${theme.background};
    --bg-surface: ${theme.surface};
    --text-primary: ${theme.text};
    --text-muted: ${theme.textMuted};
    --border-color: ${theme.border};
    --accent: ${accent};
    --accent-glow: ${accent}40;
    --radius: 8px;
    --transition: all 0.3s ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

/* Form Container */
.centaur-form-container {
    width: 100%;
    max-width: 500px;
}

.centaur-form {
    background: var(--bg-surface);
    padding: 40px;
    border-radius: calc(var(--radius) * 2);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Form Groups */
.form-group {
    margin-bottom: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-primary);
}

/* Inputs */
.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 14px 16px;
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--radius);
    color: var(--text-primary);
    font-size: 16px;
    transition: var(--transition);
}

.form-group textarea {
    min-height: 120px;
    resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: var(--text-muted);
}

/* Error States */
.form-group.has-error input,
.form-group.has-error textarea,
.form-group.has-error select {
    border-color: #ff4444;
}

.error-message {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    color: #ff4444;
    min-height: 20px;
}

/* Submit Button */
.submit-button {
    width: 100%;
    padding: 16px 24px;
    background: var(--accent);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px var(--accent-glow);
}

.submit-button:active {
    transform: translateY(0);
}

.submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

/* Toast Notification */
.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--accent);
    color: var(--bg-primary);
    padding: 16px 32px;
    border-radius: var(--radius);
    font-weight: 500;
    opacity: 0;
    transition: var(--transition);
    z-index: 1000;
}

.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
`;

        // Add responsive styles
        if (responsive) {
            css += `

/* Responsive Styles */
@media (max-width: 768px) {
    .centaur-form {
        padding: 24px;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
        padding: 12px 14px;
    }
}

@media (max-width: 480px) {
    body {
        padding: 10px;
    }
    
    .centaur-form {
        padding: 20px;
        border-radius: var(--radius);
    }
}
`;
        }

        return css;
    }

    // --------------------------------------------------------
    // JAVASCRIPT GENERATOR
    // --------------------------------------------------------
    generateJS(ast) {
        const intent = ast.intent;
        const behavior = intent.behavior || [];
        
        let js = this.getHACPComment(ast.directives.component, 'js');

        js += `
/**
 * CENTAUR LANG Generated JavaScript
 * Component: ${ast.directives.component}
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
        showToast('${this.extractSuccessMessage(behavior)}');
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
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                    return;
                }
            }
            
            // Min length validation
            if (field.minLength > 0 && field.value.length < field.minLength) {
                showError(field, \`Minimum \${field.minLength} characters required\`);
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
`;

        return js;
    }

    // --------------------------------------------------------
    // HELPER METHODS
    // --------------------------------------------------------
    
    getHACPComment(component, type = 'html') {
        const timestamp = new Date().toISOString();
        const commentStart = type === 'html' ? '<!--' : '/**';
        const commentEnd = type === 'html' ? '-->' : ' */';
        const linePrefix = type === 'html' ? '    ' : ' * ';
        
        return `${commentStart}
${linePrefix}@centaur-generated true
${linePrefix}@centaur-version ${this.version}
${linePrefix}@component ${component}
${linePrefix}@human ${this.options.humanAuthor} - specification, intent
${linePrefix}@ai ${this.options.aiAuthor} - implementation
${linePrefix}@timestamp ${timestamp}
${commentEnd}
`;
    }

    generatePlaceholder(field) {
        const placeholders = {
            name: 'Enter your name',
            email: 'Enter your email',
            phone: 'Enter your phone number',
            message: 'Write your message here...',
            subject: 'Select a subject'
        };
        return placeholders[field.name] || `Enter ${field.name}`;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    extractSuccessMessage(behavior) {
        for (const b of behavior) {
            if (b.toLowerCase().includes('success') || b.toLowerCase().includes('show')) {
                const match = b.match(/["']([^"']+)["']/);
                if (match) return match[1];
            }
        }
        return 'Success! Thank you for your submission.';
    }

    // Placeholder generators for other component types
    generateHeroHTML(ast, theme, accent) {
        return `    <section class="centaur-hero">
        <h1>Hero Section</h1>
        <p>Generated by CENTAUR LANG</p>
    </section>
`;
    }

    generateNavHTML(ast, theme, accent) {
        return `    <nav class="centaur-nav">
        <div class="nav-brand">Brand</div>
        <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
`;
    }

    generateGenericHTML(ast, theme, accent) {
        return `    <div class="centaur-component">
        <p>Component generated by CENTAUR LANG v${this.version}</p>
    </div>
`;
    }

    // --------------------------------------------------------
    // MAIN COMPILE METHOD
    // --------------------------------------------------------
    
    compile(source) {
        console.log('🐴 CENTAUR LANG Compiler v' + this.version);
        console.log('   Parsing source...');
        
        const ast = this.parse(source);
        
        console.log('   Generating code...');
        
        const html = this.generateHTML(ast);
        const css = this.generateCSS(ast);
        const js = this.generateJS(ast);
        
        console.log('   ✅ Compilation complete!');
        
        return {
            ast,
            html,
            css,
            js,
            component: ast.directives.component || 'Component'
        };
    }

    // --------------------------------------------------------
    // FILE OUTPUT
    // --------------------------------------------------------
    
    compileToFiles(source, outputDir) {
        const result = this.compile(source);
        const dir = outputDir || this.options.outputDir;
        
        // Ensure output directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        const baseName = result.component;
        
        fs.writeFileSync(path.join(dir, `${baseName}.html`), result.html);
        fs.writeFileSync(path.join(dir, `${baseName}.css`), result.css);
        fs.writeFileSync(path.join(dir, `${baseName}.js`), result.js);
        
        console.log(`\n📁 Files written to ${dir}/`);
        console.log(`   - ${baseName}.html`);
        console.log(`   - ${baseName}.css`);
        console.log(`   - ${baseName}.js`);
        
        return result;
    }
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = CentaurCompiler;

// CLI Support
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
🐴 CENTAUR LANG Compiler v0.1.0

Usage:
  node compiler.js <input.centaur> [output-dir]

Example:
  node compiler.js ContactForm.centaur ./dist

Documentation:
  See SPECIFICATION.md for language reference.
        `);
        process.exit(0);
    }
    
    const inputFile = args[0];
    const outputDir = args[1] || './dist';
    
    if (!fs.existsSync(inputFile)) {
        console.error(`❌ Error: File not found: ${inputFile}`);
        process.exit(1);
    }
    
    const source = fs.readFileSync(inputFile, 'utf-8');
    const compiler = new CentaurCompiler({
        humanAuthor: 'Chris Conen',
        aiAuthor: 'Claude'
    });
    
    compiler.compileToFiles(source, outputDir);
    
    console.log('\n🎉 Done! Open the HTML file in your browser to see the result.');
}
