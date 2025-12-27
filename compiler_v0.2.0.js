/**
 * CENTAUR LANG Compiler v0.2.0
 * 
 * @human Chris Conen - vision, specification
 * @ai Claude - full implementation
 * @timestamp 2025-12-27
 * 
 * NEW in v0.2.0: Hero, Card, Navigation components!
 */

const fs = require('fs');
const path = require('path');

class CentaurCompiler {
    constructor(options = {}) {
        this.version = '0.2.0';
        this.options = { outputDir: './dist', humanAuthor: 'Human', aiAuthor: 'Claude', ...options };
        
        this.themes = {
            dark: { background: '#0a0a0b', surface: '#141416', text: '#ffffff', textMuted: '#888888', border: '#2a2a2f' },
            light: { background: '#ffffff', surface: '#f5f5f5', text: '#1a1a1a', textMuted: '#666666', border: '#e0e0e0' },
            glass: { background: 'rgba(10,10,20,0.8)', surface: 'rgba(255,255,255,0.1)', text: '#ffffff', textMuted: 'rgba(255,255,255,0.7)', border: 'rgba(255,255,255,0.2)' }
        };
        this.accents = { gold: '#D4AF37', emerald: '#00C853', coral: '#FF6B6B', azure: '#0088FF', purple: '#9C27B0', teal: '#00BCD4' };
    }

    parse(source) {
        const ast = { directives: {}, intent: null, raw: source };
        let inIntent = false, intentBuf = [];
        
        for (const line of source.split('\n')) {
            const t = line.trim();
            if (!t || t.startsWith('//')) continue;
            if (t.startsWith('@')) { const m = t.match(/@(\w+)\s*(.*)/); if (m) ast.directives[m[1]] = m[2].trim() || true; continue; }
            if (t === '{') { inIntent = true; continue; }
            if (t === '}') { inIntent = false; ast.intent = this.parseIntent(intentBuf.join('\n'), ast.directives.component); continue; }
            if (inIntent) intentBuf.push(t);
        }
        return ast;
    }

    parseIntent(text, comp = '') {
        const type = (comp || '').toLowerCase();
        if (type.includes('hero')) return this.parseHero(text);
        if (type.includes('card')) return this.parseCard(text);
        if (type.includes('nav')) return this.parseNav(text);
        return this.parseForm(text);
    }

    parseForm(text) {
        const intent = { type: 'form', fields: [], button: { text: 'Submit' }, behavior: [] };
        for (const line of text.split('\n')) {
            if (!line.trim().startsWith('-')) continue;
            const c = line.replace(/^[\s-]+/, '').toLowerCase();
            if (c.includes('email')) intent.fields.push({ type: 'email', name: 'email', required: c.includes('required'), validate: 'email' });
            else if (c.includes('name')) intent.fields.push({ type: 'text', name: 'name', required: c.includes('required') });
            else if (c.includes('message') || c.includes('textarea')) intent.fields.push({ type: 'textarea', name: 'message', required: c.includes('required') });
            else if (c.includes('phone')) intent.fields.push({ type: 'tel', name: 'phone', required: c.includes('required') });
            else if (c.includes('password')) intent.fields.push({ type: 'password', name: 'password', required: c.includes('required') });
            else if (c.includes('subject') || c.includes('select')) intent.fields.push({ type: 'select', name: 'subject', options: ['General', 'Support', 'Partnership'] });
        }
        const btnMatch = text.match(/button[:\s]+["']([^"']+)["']/i) || text.match(/["']([^"']+)["'].*button/i);
        if (btnMatch) intent.button.text = btnMatch[1];
        return intent;
    }

    parseHero(text) {
        const i = { type: 'hero', badge: null, headline: 'Welcome', subheadline: '', primaryButton: null, secondaryButton: null, centered: true };
        for (const line of text.split('\n')) {
            const l = line.toLowerCase(), q = this.extractQ(line);
            if (l.includes('badge')) i.badge = q || 'New';
            else if (l.includes('subhead') || l.includes('subtitle')) i.subheadline = q || '';
            else if (l.includes('heading') || l.includes('headline') || l.includes('title')) i.headline = q || i.headline;
            else if (l.includes('description') && !l.includes('button')) i.subheadline = q || '';
            else if (l.includes('primary') && l.includes('button')) i.primaryButton = { text: q || 'Get Started', href: '#' };
            else if (l.includes('secondary') && l.includes('button')) i.secondaryButton = { text: q || 'Learn More', href: '#' };
        }
        return i;
    }

    parseCard(text) {
        const i = { type: 'card', image: true, title: 'Card Title', description: '', price: null, badge: null, button: null };
        for (const line of text.split('\n')) {
            const l = line.toLowerCase(), q = this.extractQ(line);
            if (l.includes('title') || l.includes('name')) i.title = q || i.title;
            else if (l.includes('description')) i.description = q || 'Description text here.';
            else if (l.includes('price')) i.price = q || '$99.00';
            else if (l.includes('badge')) i.badge = q || 'New';
            else if (l.includes('button')) i.button = { text: q || 'View', href: '#' };
            else if (l.includes('no image')) i.image = false;
        }
        return i;
    }

    parseNav(text) {
        const i = { type: 'navigation', logo: 'Brand', links: [], ctaButton: null, sticky: true };
        for (const line of text.split('\n')) {
            const l = line.toLowerCase(), q = this.extractQ(line);
            if (l.includes('logo') || l.includes('brand')) i.logo = q || 'Brand';
            else if (l.includes('cta') && l.includes('button')) i.ctaButton = { text: q || 'Get Started', href: '#' };
            else if (line.trim().startsWith('-') && !l.includes('button')) {
                const txt = q || line.replace(/^[\s-]+/, '').trim();
                if (txt) i.links.push({ text: txt, href: '#' + txt.toLowerCase().replace(/\s+/g, '-') });
            }
        }
        if (!i.links.length) i.links = [{ text: 'Home', href: '#' }, { text: 'Features', href: '#features' }, { text: 'About', href: '#about' }, { text: 'Contact', href: '#contact' }];
        return i;
    }

    extractQ(t) { const m = t.match(/["']([^"']+)["']/); return m ? m[1] : null; }

    compile(source) {
        const ast = this.parse(source);
        const type = this.detectType(ast.directives.component, ast.intent);
        return { html: this.genHTML(ast, type), css: this.genCSS(ast, type), js: this.genJS(ast, type), ast, type };
    }

    detectType(name, intent) {
        const l = (name || '').toLowerCase();
        if (l.includes('hero')) return 'hero';
        if (l.includes('card')) return 'card';
        if (l.includes('nav')) return 'navigation';
        return 'form';
    }

    genHTML(ast, type) {
        const c = ast.directives.component || 'Component';
        let h = this.hacp(c) + `<!DOCTYPE html>\n<html lang="${ast.directives.language || 'en'}">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${c}</title>\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">\n    <link rel="stylesheet" href="${c}.css">\n</head>\n<body>\n`;
        if (type === 'hero') h += this.heroHTML(ast);
        else if (type === 'card') h += this.cardHTML(ast);
        else if (type === 'navigation') h += this.navHTML(ast);
        else h += this.formHTML(ast);
        return h + `\n    <script src="${c}.js"></script>\n</body>\n</html>`;
    }

    formHTML(ast) {
        const i = ast.intent, btn = i.button || { text: 'Submit' };
        let h = `    <div class="centaur-form-container">\n        <form class="centaur-form" id="centaurForm" novalidate>\n`;
        for (const f of i.fields || []) {
            const id = 'field-' + f.name, req = f.required ? 'required' : '', label = f.name.charAt(0).toUpperCase() + f.name.slice(1);
            h += `            <div class="form-group">\n                <label for="${id}">${label}${f.required ? ' *' : ''}</label>\n`;
            if (f.type === 'textarea') h += `                <textarea id="${id}" name="${f.name}" placeholder="Enter ${f.name}" ${req}></textarea>\n`;
            else if (f.type === 'select') h += `                <select id="${id}" name="${f.name}" ${req}>\n                    <option value="">Select...</option>\n${(f.options || []).map(o => `                    <option value="${o.toLowerCase()}">${o}</option>`).join('\n')}\n                </select>\n`;
            else h += `                <input type="${f.type}" id="${id}" name="${f.name}" placeholder="Enter ${f.name}" ${req}>\n`;
            h += `                <span class="error-message" id="${id}-error"></span>\n            </div>\n`;
        }
        return h + `            <button type="submit" class="submit-button">${btn.text}</button>\n        </form>\n        <div class="toast" id="toast"></div>\n    </div>`;
    }

    heroHTML(ast) {
        const i = ast.intent;
        let h = `    <section class="centaur-hero">\n        <div class="hero-content${i.centered ? ' centered' : ''}">\n`;
        if (i.badge) h += `            <span class="hero-badge">${i.badge}</span>\n`;
        h += `            <h1 class="hero-headline">${i.headline}</h1>\n`;
        if (i.subheadline) h += `            <p class="hero-subheadline">${i.subheadline}</p>\n`;
        if (i.primaryButton || i.secondaryButton) {
            h += `            <div class="hero-buttons">\n`;
            if (i.primaryButton) h += `                <a href="${i.primaryButton.href}" class="btn btn-primary">${i.primaryButton.text}</a>\n`;
            if (i.secondaryButton) h += `                <a href="${i.secondaryButton.href}" class="btn btn-secondary">${i.secondaryButton.text}</a>\n`;
            h += `            </div>\n`;
        }
        return h + `        </div>\n    </section>`;
    }

    cardHTML(ast) {
        const i = ast.intent;
        let h = `    <article class="centaur-card">\n`;
        if (i.image) h += `        <div class="card-image"><div class="image-placeholder">Image</div></div>\n`;
        h += `        <div class="card-content">\n`;
        if (i.badge) h += `            <span class="card-badge">${i.badge}</span>\n`;
        h += `            <h3 class="card-title">${i.title}</h3>\n`;
        if (i.description) h += `            <p class="card-description">${i.description}</p>\n`;
        if (i.price) h += `            <p class="card-price">${i.price}</p>\n`;
        if (i.button) h += `            <a href="${i.button.href}" class="card-button">${i.button.text}</a>\n`;
        return h + `        </div>\n    </article>`;
    }

    navHTML(ast) {
        const i = ast.intent;
        let h = `    <nav class="centaur-nav${i.sticky ? ' sticky' : ''}">\n        <div class="nav-container">\n            <a href="#" class="nav-logo">${i.logo}</a>\n            <button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>\n            <ul class="nav-links">\n`;
        for (const l of i.links) h += `                <li><a href="${l.href}">${l.text}</a></li>\n`;
        h += `            </ul>\n`;
        if (i.ctaButton) h += `            <a href="${i.ctaButton.href}" class="nav-cta">${i.ctaButton.text}</a>\n`;
        return h + `        </div>\n    </nav>`;
    }

    genCSS(ast, type) {
        const t = this.themes[ast.directives.theme] || this.themes.dark;
        const a = this.accents[ast.directives.accent] || this.accents.gold;
        let css = this.hacp(ast.directives.component, 'css') + `\n* { margin: 0; padding: 0; box-sizing: border-box; }\nbody { font-family: 'Inter', sans-serif; background: ${t.background}; color: ${t.text}; line-height: 1.6; min-height: 100vh; }\n`;
        if (type === 'hero') css += this.heroCSS(t, a);
        else if (type === 'card') css += this.cardCSS(t, a);
        else if (type === 'navigation') css += this.navCSS(t, a);
        else css += this.formCSS(t, a);
        return css;
    }

    formCSS(t, a) {
        return `.centaur-form-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.centaur-form { width: 100%; max-width: 450px; background: ${t.surface}; padding: 40px; border-radius: 16px; border: 1px solid ${t.border}; }
.form-group { margin-bottom: 24px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 14px 16px; background: ${t.background}; border: 2px solid ${t.border}; border-radius: 10px; color: ${t.text}; font-size: 16px; font-family: inherit; transition: all 0.3s; }
.form-group textarea { min-height: 120px; resize: vertical; }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: ${a}; box-shadow: 0 0 0 4px ${a}25; }
.form-group input.error { border-color: #FF4444; }
.error-message { display: block; color: #FF4444; font-size: 13px; margin-top: 6px; min-height: 20px; }
.submit-button { width: 100%; padding: 16px; background: ${a}; color: #0a0a0b; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.submit-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${a}40; }
.toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px); background: #00C853; color: white; padding: 16px 32px; border-radius: 10px; font-weight: 600; opacity: 0; transition: all 0.4s; }
.toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
`;
    }

    heroCSS(t, a) {
        return `.centaur-hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 80px 40px; position: relative; }
.hero-content { max-width: 900px; }
.hero-content.centered { text-align: center; }
.hero-badge { display: inline-block; background: ${a}20; color: ${a}; padding: 8px 20px; border-radius: 100px; font-size: 14px; font-weight: 600; margin-bottom: 24px; border: 1px solid ${a}40; }
.hero-headline { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -2px; }
.hero-subheadline { font-size: clamp(1.1rem, 2.5vw, 1.4rem); color: ${t.textMuted}; margin-bottom: 40px; max-width: 600px; }
.hero-content.centered .hero-subheadline { margin-left: auto; margin-right: auto; }
.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
.hero-content.centered .hero-buttons { justify-content: center; }
.btn { padding: 16px 32px; border-radius: 12px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.3s; }
.btn-primary { background: ${a}; color: #0a0a0b; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 35px ${a}40; }
.btn-secondary { background: ${t.surface}; color: ${t.text}; border: 2px solid ${t.border}; }
.btn-secondary:hover { border-color: ${a}; color: ${a}; }
@media (max-width: 768px) { .centaur-hero { padding: 60px 20px; } .hero-buttons { flex-direction: column; } .btn { width: 100%; text-align: center; } }
`;
    }

    cardCSS(t, a) {
        return `body { display: flex; align-items: center; justify-content: center; padding: 40px; }
.centaur-card { width: 100%; max-width: 350px; background: ${t.surface}; border-radius: 20px; overflow: hidden; border: 1px solid ${t.border}; transition: all 0.4s; }
.centaur-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); border-color: ${a}; }
.card-image { width: 100%; aspect-ratio: 16/10; background: ${t.background}; display: flex; align-items: center; justify-content: center; }
.image-placeholder { color: ${t.textMuted}; font-size: 14px; }
.card-content { padding: 24px; }
.card-badge { display: inline-block; background: ${a}20; color: ${a}; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
.card-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
.card-description { color: ${t.textMuted}; font-size: 14px; margin-bottom: 16px; }
.card-price { font-size: 1.5rem; font-weight: 800; color: ${a}; margin-bottom: 16px; }
.card-button { display: block; width: 100%; padding: 14px; background: ${a}; color: #0a0a0b; text-align: center; text-decoration: none; border-radius: 10px; font-weight: 700; transition: all 0.3s; }
.card-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px ${a}40; }
`;
    }

    navCSS(t, a) {
        return `.centaur-nav { width: 100%; padding: 16px 40px; background: ${t.surface}; border-bottom: 1px solid ${t.border}; }
.centaur-nav.sticky { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
.nav-container { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.nav-logo { font-size: 1.4rem; font-weight: 800; color: ${t.text}; text-decoration: none; }
.nav-links { display: flex; gap: 32px; list-style: none; }
.nav-links a { color: ${t.textMuted}; text-decoration: none; font-weight: 500; transition: color 0.3s; }
.nav-links a:hover { color: ${a}; }
.nav-cta { background: ${a}; color: #0a0a0b; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; transition: all 0.3s; }
.nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 20px ${a}40; }
.nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 5px; }
.nav-toggle span { width: 24px; height: 2px; background: ${t.text}; }
@media (max-width: 768px) { .nav-toggle { display: flex; } .nav-links { position: fixed; top: 60px; left: 0; right: 0; background: ${t.surface}; flex-direction: column; padding: 20px; gap: 16px; transform: translateY(-100%); opacity: 0; transition: all 0.3s; } .nav-links.active { transform: translateY(0); opacity: 1; } .nav-cta { display: none; } }
`;
    }

    genJS(ast, type) {
        const c = ast.directives.component;
        let js = this.hacp(c, 'js');
        if (type === 'form') js += this.formJS(ast);
        else if (type === 'hero') js += `document.addEventListener('DOMContentLoaded', () => { const c = document.querySelector('.hero-content'); c.style.opacity = '0'; c.style.transform = 'translateY(30px)'; setTimeout(() => { c.style.transition = 'all 0.8s'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, 100); });`;
        else if (type === 'card') js += `document.addEventListener('DOMContentLoaded', () => { console.log('Card loaded'); });`;
        else if (type === 'navigation') js += `document.addEventListener('DOMContentLoaded', () => { const t = document.querySelector('.nav-toggle'), l = document.querySelector('.nav-links'); t.addEventListener('click', () => l.classList.toggle('active')); document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => l.classList.remove('active'))); });`;
        return js;
    }

    formJS(ast) {
        const hasEmail = ast.intent.fields?.some(f => f.type === 'email');
        return `document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('centaurForm'), toast = document.getElementById('toast');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        form.querySelectorAll('[required]').forEach(f => { if (!f.value.trim()) { valid = false; f.classList.add('error'); document.getElementById(f.id + '-error').textContent = 'Required'; } });
        ${hasEmail ? `const email = document.getElementById('field-email'); if (email && email.value && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) { valid = false; email.classList.add('error'); document.getElementById('field-email-error').textContent = 'Invalid email'; }` : ''}
        if (valid) { toast.textContent = 'Success!'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); form.reset(); }
    });
});`;
    }

    hacp(comp, type = 'html') {
        const s = type === 'js' ? '/**' : '<!--', e = type === 'js' ? ' */' : '-->', p = type === 'js' ? ' * ' : '    ';
        return `${s}\n${p}@centaur-generated true\n${p}@version ${this.version}\n${p}@component ${comp}\n${p}@human ${this.options.humanAuthor}\n${p}@ai ${this.options.aiAuthor}\n${p}@timestamp ${new Date().toISOString()}\n${e}\n`;
    }

    compileToFiles(source, outputDir = this.options.outputDir) {
        const r = this.compile(source), c = r.ast.directives.component || 'Component';
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, `${c}.html`), r.html);
        fs.writeFileSync(path.join(outputDir, `${c}.css`), r.css);
        fs.writeFileSync(path.join(outputDir, `${c}.js`), r.js);
        console.log(`✅ ${c}.html\n✅ ${c}.css\n✅ ${c}.js\n📁 ${outputDir}`);
        return r;
    }
}

module.exports = CentaurCompiler;

if (require.main === module) {
    const args = process.argv.slice(2);
    if (!args.length) { console.log(`🐴 CENTAUR LANG v0.2.0\n\nUsage: node compiler.js <file.centaur> [output-dir]\n\nComponents: Form, Hero, Card, Navigation`); process.exit(0); }
    if (!fs.existsSync(args[0])) { console.error('❌ File not found:', args[0]); process.exit(1); }
    new CentaurCompiler({ humanAuthor: 'Chris Conen', aiAuthor: 'Claude' }).compileToFiles(fs.readFileSync(args[0], 'utf-8'), args[1] || './dist');
    console.log('\n🎉 Done!');
}
