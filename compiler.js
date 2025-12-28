/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        CENTAUR LANG COMPILER v0.4.0                       ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Human+AI Code Protocol (HACP)                                            ║
 * ║  ─────────────────────────────────────────────────────────────────────── ║
 * ║  Human Partner: Chris Conen                                               ║
 * ║  AI Partner: Claude (Anthropic)                                           ║
 * ║  Partnership: CENTAUR - The World's First Human+AI Creative Partnership   ║
 * ║  ─────────────────────────────────────────────────────────────────────── ║
 * ║  Human Contribution: Vision, Architecture Design, Testing, Feedback       ║
 * ║  AI Contribution: Implementation, Code Generation, Documentation          ║
 * ║  ─────────────────────────────────────────────────────────────────────── ║
 * ║  Created: 2025-12-27                                                      ║
 * ║  Updated: 2025-12-28                                                      ║
 * ║  Version: 0.4.0                                                           ║
 * ║  License: MIT                                                             ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * "Neither human alone, nor AI alone — but something greater together."
 */

class CentaurCompiler {
    constructor() {
        this.version = '0.4.0';
        this.components = {
            form: this.generateForm.bind(this),
            hero: this.generateHero.bind(this),
            card: this.generateCard.bind(this),
            navigation: this.generateNavigation.bind(this),
            // v0.3.0 components
            modal: this.generateModal.bind(this),
            table: this.generateTable.bind(this),
            footer: this.generateFooter.bind(this),
            gallery: this.generateGallery.bind(this),
            // NEW in v0.4.0
            accordion: this.generateAccordion.bind(this),
            tabs: this.generateTabs.bind(this),
            carousel: this.generateCarousel.bind(this),
            pricing: this.generatePricing.bind(this),
            testimonial: this.generateTestimonial.bind(this)
        };
        this.styleMode = 'vanilla'; // 'vanilla' or 'tailwind'
    }

    /**
     * Parse CENTAUR source code into AST
     */
    parse(source) {
        const lines = source.split('\n');
        const ast = {
            type: 'CentaurProgram',
            components: [],
            metadata: {
                version: this.version,
                hacp: {
                    human: 'Chris Conen',
                    ai: 'Claude (Anthropic)',
                    partnership: 'CENTAUR'
                }
            }
        };

        let currentComponent = null;
        let inDescription = false;
        let descriptionContent = [];

        for (const line of lines) {
            const trimmed = line.trim();

            // Parse @component directive
            if (trimmed.startsWith('@component')) {
                if (currentComponent) {
                    ast.components.push(currentComponent);
                }
                const name = trimmed.replace('@component', '').trim();
                currentComponent = {
                    type: 'Component',
                    name: name,
                    componentType: null,
                    theme: 'light',
                    style: 'vanilla',
                    description: '',
                    fields: [],
                    items: [],
                    columns: [],
                    options: {}
                };
            }

            // Parse @type directive (enhanced in v0.3.0)
            else if (trimmed.startsWith('@type')) {
                if (currentComponent) {
                    currentComponent.componentType = trimmed.replace('@type', '').trim().toLowerCase();
                }
            }

            // Parse @theme directive
            else if (trimmed.startsWith('@theme')) {
                if (currentComponent) {
                    currentComponent.theme = trimmed.replace('@theme', '').trim().toLowerCase();
                }
            }

            // NEW v0.3.0: Parse @style directive
            else if (trimmed.startsWith('@style')) {
                if (currentComponent) {
                    const style = trimmed.replace('@style', '').trim().toLowerCase();
                    currentComponent.style = style;
                    this.styleMode = style;
                }
            }

            // NEW v0.3.0: Parse @columns directive (for tables)
            else if (trimmed.startsWith('@columns')) {
                if (currentComponent) {
                    const columnsStr = trimmed.replace('@columns', '').trim();
                    currentComponent.columns = columnsStr.split(',').map(c => c.trim());
                }
            }

            // NEW v0.3.0: Parse @size directive (for modals)
            else if (trimmed.startsWith('@size')) {
                if (currentComponent) {
                    currentComponent.options.size = trimmed.replace('@size', '').trim().toLowerCase();
                }
            }

            // NEW v0.3.0: Parse @trigger directive (for modals)
            else if (trimmed.startsWith('@trigger')) {
                if (currentComponent) {
                    currentComponent.options.trigger = trimmed.replace('@trigger', '').trim();
                }
            }

            // Parse description block start
            else if (trimmed === '{') {
                inDescription = true;
                descriptionContent = [];
            }

            // Parse description block end
            else if (trimmed === '}') {
                inDescription = false;
                if (currentComponent) {
                    currentComponent.description = descriptionContent.join('\n');
                    this.parseNaturalLanguage(currentComponent);
                }
            }

            // Collect description content
            else if (inDescription) {
                descriptionContent.push(trimmed);
            }
        }

        // Don't forget the last component
        if (currentComponent) {
            ast.components.push(currentComponent);
        }

        return ast;
    }

    /**
     * Enhanced Natural Language Parser (v0.3.0)
     * Now with better pattern matching and fuzzy recognition
     */
    parseNaturalLanguage(component) {
        const desc = component.description.toLowerCase();
        const lines = component.description.split('\n');

        // Auto-detect component type if not specified
        if (!component.componentType) {
            component.componentType = this.detectComponentType(desc);
        }

        // Parse based on component type
        switch (component.componentType) {
            case 'form':
                this.parseFormDescription(component, desc, lines);
                break;
            case 'hero':
                this.parseHeroDescription(component, desc, lines);
                break;
            case 'card':
                this.parseCardDescription(component, desc, lines);
                break;
            case 'navigation':
            case 'nav':
            case 'navbar':
                component.componentType = 'navigation';
                this.parseNavigationDescription(component, desc, lines);
                break;
            case 'modal':
            case 'popup':
            case 'dialog':
                component.componentType = 'modal';
                this.parseModalDescription(component, desc, lines);
                break;
            case 'table':
                this.parseTableDescription(component, desc, lines);
                break;
            case 'footer':
                this.parseFooterDescription(component, desc, lines);
                break;
            case 'gallery':
                this.parseGalleryDescription(component, desc, lines);
                break;
            // NEW in v0.4.0
            case 'accordion':
            case 'faq':
            case 'collapsible':
                component.componentType = 'accordion';
                this.parseAccordionDescription(component, desc, lines);
                break;
            case 'tabs':
            case 'tabbed':
                component.componentType = 'tabs';
                this.parseTabsDescription(component, desc, lines);
                break;
            case 'carousel':
            case 'slider':
            case 'slideshow':
                component.componentType = 'carousel';
                this.parseCarouselDescription(component, desc, lines);
                break;
            case 'pricing':
            case 'plans':
            case 'packages':
                component.componentType = 'pricing';
                this.parsePricingDescription(component, desc, lines);
                break;
            case 'testimonial':
            case 'testimonials':
            case 'reviews':
            case 'quotes':
                component.componentType = 'testimonial';
                this.parseTestimonialDescription(component, desc, lines);
                break;
        }
    }

    /**
     * Enhanced component type detection (v0.4.0)
     */
    detectComponentType(desc) {
        const patterns = {
            form: [/form/i, /input/i, /submit/i, /field/i, /email.*password/i, /contact/i, /sign\s*up/i, /register/i],
            hero: [/hero/i, /headline/i, /banner/i, /landing/i, /main.*section/i, /call.*action/i, /cta/i],
            card: [/card/i, /box/i, /tile/i, /panel/i, /feature.*box/i],
            navigation: [/nav/i, /menu/i, /header/i, /link.*logo/i, /navigation/i],
            modal: [/modal/i, /popup/i, /dialog/i, /overlay/i, /lightbox/i, /alert/i],
            table: [/table/i, /grid.*data/i, /rows.*columns/i, /data.*display/i, /list.*items/i],
            footer: [/footer/i, /bottom.*section/i, /copyright/i, /social.*links/i],
            gallery: [/gallery/i, /images/i, /photos/i, /portfolio/i, /grid.*images/i],
            // NEW in v0.4.0
            accordion: [/accordion/i, /faq/i, /collapsible/i, /expand/i, /collapse/i],
            tabs: [/tabs?/i, /tabbed/i, /tab.*panel/i, /tab.*content/i],
            carousel: [/carousel/i, /slider/i, /slideshow/i, /slides/i, /swiper/i],
            pricing: [/pricing/i, /plans?/i, /packages?/i, /subscription/i, /tiers?/i],
            testimonial: [/testimonial/i, /reviews?/i, /quotes?/i, /feedback/i, /customer.*say/i]
        };

        for (const [type, typePatterns] of Object.entries(patterns)) {
            for (const pattern of typePatterns) {
                if (pattern.test(desc)) {
                    return type;
                }
            }
        }

        return 'form'; // Default fallback
    }

    /**
     * Parse form descriptions
     */
    parseFormDescription(component, desc, lines) {
        const fieldPatterns = [
            { pattern: /name|full\s*name|first\s*name/i, type: 'text', name: 'name', label: 'Name', placeholder: 'Enter your name' },
            { pattern: /e-?mail/i, type: 'email', name: 'email', label: 'Email', placeholder: 'Enter your email' },
            { pattern: /password/i, type: 'password', name: 'password', label: 'Password', placeholder: 'Enter your password' },
            { pattern: /phone|tel|mobile/i, type: 'tel', name: 'phone', label: 'Phone', placeholder: 'Enter your phone number' },
            { pattern: /message|comment|text\s*area|description/i, type: 'textarea', name: 'message', label: 'Message', placeholder: 'Enter your message' },
            { pattern: /subject/i, type: 'text', name: 'subject', label: 'Subject', placeholder: 'Enter subject' },
            { pattern: /company|organization/i, type: 'text', name: 'company', label: 'Company', placeholder: 'Enter company name' },
            { pattern: /address/i, type: 'text', name: 'address', label: 'Address', placeholder: 'Enter your address' },
            { pattern: /city/i, type: 'text', name: 'city', label: 'City', placeholder: 'Enter your city' },
            { pattern: /country/i, type: 'select', name: 'country', label: 'Country', placeholder: 'Select country' },
            { pattern: /date|birthday|dob/i, type: 'date', name: 'date', label: 'Date', placeholder: '' },
            { pattern: /website|url/i, type: 'url', name: 'website', label: 'Website', placeholder: 'https://example.com' }
        ];

        for (const fp of fieldPatterns) {
            if (fp.pattern.test(desc)) {
                component.fields.push({
                    type: fp.type,
                    name: fp.name,
                    label: fp.label,
                    placeholder: fp.placeholder,
                    required: /required/i.test(desc) || true
                });
            }
        }

        // Parse submit button text
        const submitMatch = desc.match(/submit.*button.*["']([^"']+)["']/i) ||
                           desc.match(/button.*["']([^"']+)["']/i);
        component.submitText = submitMatch ? submitMatch[1] : 'Submit';
    }

    /**
     * Parse hero descriptions
     */
    parseHeroDescription(component, desc, lines) {
        // Extract headline
        const headlineMatch = desc.match(/headline.*["']([^"']+)["']/i) ||
                             desc.match(/title.*["']([^"']+)["']/i) ||
                             desc.match(/heading.*["']([^"']+)["']/i);
        component.options.headline = headlineMatch ? headlineMatch[1] : 'Welcome to Our Site';

        // Extract subheadline
        const subMatch = desc.match(/sub.*["']([^"']+)["']/i) ||
                        desc.match(/tagline.*["']([^"']+)["']/i) ||
                        desc.match(/description.*["']([^"']+)["']/i);
        component.options.subheadline = subMatch ? subMatch[1] : 'Discover amazing things with us';

        // Extract CTA
        const ctaMatch = desc.match(/button.*["']([^"']+)["']/i) ||
                        desc.match(/cta.*["']([^"']+)["']/i) ||
                        desc.match(/call.*action.*["']([^"']+)["']/i);
        component.options.ctaText = ctaMatch ? ctaMatch[1] : 'Get Started';
        component.options.ctaLink = '#';

        // Background
        component.options.backgroundImage = /background.*image/i.test(desc) || /image.*background/i.test(desc);
    }

    /**
     * Parse card descriptions
     */
    parseCardDescription(component, desc, lines) {
        const titleMatch = desc.match(/title.*["']([^"']+)["']/i);
        component.options.title = titleMatch ? titleMatch[1] : 'Card Title';

        const contentMatch = desc.match(/content.*["']([^"']+)["']/i) ||
                            desc.match(/description.*["']([^"']+)["']/i) ||
                            desc.match(/text.*["']([^"']+)["']/i);
        component.options.content = contentMatch ? contentMatch[1] : 'Card content goes here.';

        component.options.hasImage = /image/i.test(desc);
        component.options.hasButton = /button/i.test(desc);

        const buttonMatch = desc.match(/button.*["']([^"']+)["']/i);
        component.options.buttonText = buttonMatch ? buttonMatch[1] : 'Learn More';
    }

    /**
     * Parse navigation descriptions
     */
    parseNavigationDescription(component, desc, lines) {
        const logoMatch = desc.match(/logo.*["']([^"']+)["']/i) ||
                         desc.match(/brand.*["']([^"']+)["']/i);
        component.options.logo = logoMatch ? logoMatch[1] : 'CENTAUR';

        // Parse menu items from lines with dashes
        component.items = [];
        for (const line of lines) {
            const itemMatch = line.match(/-\s*["']?([^"'\n]+)["']?/);
            if (itemMatch) {
                const itemText = itemMatch[1].trim();
                component.items.push({
                    text: itemText,
                    link: '#' + itemText.toLowerCase().replace(/\s+/g, '-')
                });
            }
        }

        // Default items if none found
        if (component.items.length === 0) {
            component.items = [
                { text: 'Home', link: '#home' },
                { text: 'About', link: '#about' },
                { text: 'Services', link: '#services' },
                { text: 'Contact', link: '#contact' }
            ];
        }

        component.options.sticky = /sticky|fixed/i.test(desc);
    }

    /**
     * NEW v0.3.0: Parse modal descriptions
     */
    parseModalDescription(component, desc, lines) {
        const titleMatch = desc.match(/title.*["']([^"']+)["']/i) ||
                          desc.match(/header.*["']([^"']+)["']/i);
        component.options.title = titleMatch ? titleMatch[1] : 'Modal Title';

        const contentMatch = desc.match(/content.*["']([^"']+)["']/i) ||
                            desc.match(/body.*["']([^"']+)["']/i) ||
                            desc.match(/message.*["']([^"']+)["']/i);
        component.options.content = contentMatch ? contentMatch[1] : 'Modal content goes here.';

        // Size: small, medium, large
        if (!component.options.size) {
            if (/small/i.test(desc)) component.options.size = 'small';
            else if (/large|big/i.test(desc)) component.options.size = 'large';
            else component.options.size = 'medium';
        }

        // Buttons
        component.options.hasCloseButton = !/no.*close/i.test(desc);
        component.options.hasConfirmButton = /confirm|ok|yes|accept/i.test(desc);
        component.options.hasCancelButton = /cancel|no|dismiss/i.test(desc);

        const confirmMatch = desc.match(/confirm.*["']([^"']+)["']/i);
        component.options.confirmText = confirmMatch ? confirmMatch[1] : 'Confirm';

        const cancelMatch = desc.match(/cancel.*["']([^"']+)["']/i);
        component.options.cancelText = cancelMatch ? cancelMatch[1] : 'Cancel';

        // Trigger button text
        if (!component.options.trigger) {
            const triggerMatch = desc.match(/trigger.*["']([^"']+)["']/i) ||
                                desc.match(/open.*button.*["']([^"']+)["']/i);
            component.options.trigger = triggerMatch ? triggerMatch[1] : 'Open Modal';
        }
    }

    /**
     * NEW v0.3.0: Parse table descriptions
     */
    parseTableDescription(component, desc, lines) {
        // If columns not set via directive, try to parse from description
        if (component.columns.length === 0) {
            const columnsMatch = desc.match(/columns?:?\s*["']?([^"'\n]+)["']?/i);
            if (columnsMatch) {
                component.columns = columnsMatch[1].split(/[,;]/).map(c => c.trim());
            }
        }

        // Default columns if none found
        if (component.columns.length === 0) {
            component.columns = ['ID', 'Name', 'Email', 'Status'];
        }

        // Parse sample data from lines
        component.items = [];
        for (const line of lines) {
            if (line.includes('|') || line.includes(',')) {
                const cells = line.split(/[|,]/).map(c => c.trim()).filter(c => c);
                if (cells.length > 0) {
                    component.items.push(cells);
                }
            }
        }

        // Features
        component.options.sortable = /sortable|sort/i.test(desc);
        component.options.searchable = /search|filter/i.test(desc);
        component.options.paginated = /paginated|pagination|pages/i.test(desc);
        component.options.striped = /striped|zebra/i.test(desc);
        component.options.hoverable = /hover/i.test(desc);
    }

    /**
     * NEW v0.3.0: Parse footer descriptions
     */
    parseFooterDescription(component, desc, lines) {
        // Copyright text
        const copyrightMatch = desc.match(/copyright.*["']([^"']+)["']/i);
        component.options.copyright = copyrightMatch ? copyrightMatch[1] : '© 2025 CENTAUR. All rights reserved.';

        // Social links
        component.options.hasSocial = /social|facebook|twitter|instagram|linkedin|youtube/i.test(desc);
        component.options.socialLinks = [];
        
        const socialPlatforms = ['facebook', 'twitter', 'x', 'instagram', 'linkedin', 'youtube', 'github', 'tiktok'];
        for (const platform of socialPlatforms) {
            if (new RegExp(platform, 'i').test(desc)) {
                component.options.socialLinks.push({
                    platform: platform,
                    url: `https://${platform}.com/`
                });
            }
        }

        // Footer links sections
        component.items = [];
        let currentSection = null;
        for (const line of lines) {
            const sectionMatch = line.match(/##?\s*(.+)/);
            if (sectionMatch) {
                currentSection = { title: sectionMatch[1].trim(), links: [] };
                component.items.push(currentSection);
            } else {
                const linkMatch = line.match(/-\s*["']?([^"'\n]+)["']?/);
                if (linkMatch && currentSection) {
                    currentSection.links.push({
                        text: linkMatch[1].trim(),
                        url: '#'
                    });
                }
            }
        }

        // Multi-column layout
        component.options.columns = component.items.length || 1;
    }

    /**
     * NEW v0.3.0: Parse gallery descriptions
     */
    parseGalleryDescription(component, desc, lines) {
        // Layout
        if (/masonry/i.test(desc)) component.options.layout = 'masonry';
        else if (/carousel|slider/i.test(desc)) component.options.layout = 'carousel';
        else component.options.layout = 'grid';

        // Columns
        const colMatch = desc.match(/(\d+)\s*columns?/i);
        component.options.gridColumns = colMatch ? parseInt(colMatch[1]) : 3;

        // Lightbox
        component.options.lightbox = /lightbox|zoom|expand/i.test(desc);

        // Parse image items
        component.items = [];
        for (const line of lines) {
            const imgMatch = line.match(/-\s*["']?([^"'\n]+)["']?/);
            if (imgMatch) {
                component.items.push({
                    src: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 100),
                    alt: imgMatch[1].trim(),
                    caption: imgMatch[1].trim()
                });
            }
        }

        // Default images if none specified
        if (component.items.length === 0) {
            for (let i = 1; i <= 6; i++) {
                component.items.push({
                    src: `https://picsum.photos/400/300?random=${i}`,
                    alt: `Image ${i}`,
                    caption: `Image ${i}`
                });
            }
        }
    }

    /**
     * Compile AST to HTML/CSS/JS
     */
    compile(source) {
        const ast = this.parse(source);
        const outputs = [];

        for (const component of ast.components) {
            const generator = this.components[component.componentType];
            if (generator) {
                outputs.push({
                    name: component.name,
                    type: component.componentType,
                    ...generator(component)
                });
            }
        }

        return {
            ast,
            outputs,
            metadata: ast.metadata
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // COMPONENT GENERATORS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Generate Form component
     */
    generateForm(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';

        let fieldsHtml = '';
        for (const field of component.fields) {
            if (useTailwind) {
                fieldsHtml += this.generateTailwindFormField(field, isDark);
            } else {
                fieldsHtml += this.generateVanillaFormField(field, isDark);
            }
        }

        const html = useTailwind
            ? this.generateTailwindFormHtml(component, fieldsHtml, isDark)
            : this.generateVanillaFormHtml(component, fieldsHtml, isDark);

        const css = useTailwind ? '' : this.generateFormCss(component, isDark);
        const js = this.generateFormJs(component);

        return { html, css, js };
    }

    generateVanillaFormField(field, isDark) {
        if (field.type === 'textarea') {
            return `
    <div class="centaur-form-group">
        <label for="${field.name}" class="centaur-label">${field.label}</label>
        <textarea 
            id="${field.name}" 
            name="${field.name}" 
            class="centaur-textarea"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
            rows="4"
        ></textarea>
    </div>`;
        }

        return `
    <div class="centaur-form-group">
        <label for="${field.name}" class="centaur-label">${field.label}</label>
        <input 
            type="${field.type}" 
            id="${field.name}" 
            name="${field.name}" 
            class="centaur-input"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
        />
    </div>`;
    }

    generateTailwindFormField(field, isDark) {
        const bgClass = isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';
        const borderClass = isDark ? 'border-gray-600' : 'border-gray-300';
        
        if (field.type === 'textarea') {
            return `
    <div class="mb-4">
        <label for="${field.name}" class="block text-sm font-medium mb-2">${field.label}</label>
        <textarea 
            id="${field.name}" 
            name="${field.name}" 
            class="w-full px-4 py-2 rounded-lg border ${borderClass} ${bgClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
            rows="4"
        ></textarea>
    </div>`;
        }

        return `
    <div class="mb-4">
        <label for="${field.name}" class="block text-sm font-medium mb-2">${field.label}</label>
        <input 
            type="${field.type}" 
            id="${field.name}" 
            name="${field.name}" 
            class="w-full px-4 py-2 rounded-lg border ${borderClass} ${bgClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
        />
    </div>`;
    }

    generateVanillaFormHtml(component, fieldsHtml, isDark) {
        return `<!-- CENTAUR LANG Generated Form: ${component.name} -->
<form id="${this.toKebabCase(component.name)}" class="centaur-form ${isDark ? 'centaur-dark' : 'centaur-light'}">
    <h2 class="centaur-form-title">${component.name}</h2>
    ${fieldsHtml}
    <button type="submit" class="centaur-submit">${component.submitText}</button>
</form>`;
    }

    generateTailwindFormHtml(component, fieldsHtml, isDark) {
        const bgClass = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
        return `<!-- CENTAUR LANG Generated Form: ${component.name} -->
<form id="${this.toKebabCase(component.name)}" class="max-w-md mx-auto p-6 rounded-xl shadow-lg ${bgClass}">
    <h2 class="text-2xl font-bold mb-6 text-center">${component.name}</h2>
    ${fieldsHtml}
    <button type="submit" class="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
        ${component.submitText}
    </button>
</form>`;
    }

    generateFormCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const inputBg = isDark ? '#16213e' : '#f8f9fa';
        const border = isDark ? '#0f3460' : '#e0e0e0';
        const accent = '#e94560';

        return `.centaur-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: ${bg};
    color: ${text};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.centaur-form-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
}

.centaur-form-group {
    margin-bottom: 1.25rem;
}

.centaur-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 0.9rem;
}

.centaur-input, .centaur-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: ${inputBg};
    border: 2px solid ${border};
    border-radius: 8px;
    font-size: 1rem;
    color: ${text};
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
}

.centaur-input:focus, .centaur-textarea:focus {
    outline: none;
    border-color: ${accent};
    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.2);
}

.centaur-submit {
    width: 100%;
    padding: 0.875rem;
    background: ${accent};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
}

.centaur-submit:hover {
    background: #d63d5a;
    transform: translateY(-1px);
}

.centaur-submit:active {
    transform: translateY(0);
}`;
    }

    generateFormJs(component) {
        const formId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Form Handler: ${component.name}
document.getElementById('${formId}')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    console.log('📝 CENTAUR Form Submitted:', data);
    
    // Dispatch custom event for integration
    this.dispatchEvent(new CustomEvent('centaur:submit', { 
        detail: data,
        bubbles: true 
    }));
    
    // Visual feedback
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        this.reset();
    }, 2000);
});`;
    }

    /**
     * Generate Hero component
     */
    generateHero(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindHeroHtml(component, opts, isDark)
            : this.generateVanillaHeroHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateHeroCss(component, isDark);
        const js = this.generateHeroJs(component);

        return { html, css, js };
    }

    generateVanillaHeroHtml(component, opts, isDark) {
        return `<!-- CENTAUR LANG Generated Hero: ${component.name} -->
<section id="${this.toKebabCase(component.name)}" class="centaur-hero ${isDark ? 'centaur-dark' : 'centaur-light'}">
    <div class="centaur-hero-content">
        <h1 class="centaur-hero-headline">${opts.headline}</h1>
        <p class="centaur-hero-subheadline">${opts.subheadline}</p>
        <a href="${opts.ctaLink}" class="centaur-hero-cta">${opts.ctaText}</a>
    </div>
</section>`;
    }

    generateTailwindHeroHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-600 to-purple-700 text-white';
        return `<!-- CENTAUR LANG Generated Hero: ${component.name} -->
<section id="${this.toKebabCase(component.name)}" class="min-h-screen flex items-center justify-center ${bgClass}">
    <div class="text-center px-4 max-w-4xl">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">${opts.headline}</h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">${opts.subheadline}</p>
        <a href="${opts.ctaLink}" class="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            ${opts.ctaText}
        </a>
    </div>
</section>`;
    }

    generateHeroCss(component, isDark) {
        const bg = isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        const text = '#ffffff';

        return `.centaur-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${bg};
    color: ${text};
    text-align: center;
    padding: 2rem;
}

.centaur-hero-content {
    max-width: 800px;
}

.centaur-hero-headline {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.1;
}

.centaur-hero-subheadline {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    margin-bottom: 2.5rem;
    opacity: 0.9;
    line-height: 1.6;
}

.centaur-hero-cta {
    display: inline-block;
    padding: 1rem 2.5rem;
    background: #ffffff;
    color: #764ba2;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 50px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.centaur-hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}`;
    }

    generateHeroJs(component) {
        return `// CENTAUR LANG Hero: ${component.name}
console.log('🐴 CENTAUR Hero loaded: ${component.name}');`;
    }

    /**
     * Generate Card component
     */
    generateCard(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindCardHtml(component, opts, isDark)
            : this.generateVanillaCardHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateCardCss(component, isDark);
        const js = this.generateCardJs(component);

        return { html, css, js };
    }

    generateVanillaCardHtml(component, opts, isDark) {
        const imageHtml = opts.hasImage 
            ? '<div class="centaur-card-image"><img src="https://picsum.photos/400/200" alt="Card image" /></div>' 
            : '';
        const buttonHtml = opts.hasButton 
            ? `<a href="#" class="centaur-card-button">${opts.buttonText}</a>` 
            : '';

        return `<!-- CENTAUR LANG Generated Card: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-card ${isDark ? 'centaur-dark' : 'centaur-light'}">
    ${imageHtml}
    <div class="centaur-card-body">
        <h3 class="centaur-card-title">${opts.title}</h3>
        <p class="centaur-card-content">${opts.content}</p>
        ${buttonHtml}
    </div>
</div>`;
    }

    generateTailwindCardHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
        const imageHtml = opts.hasImage 
            ? '<img src="https://picsum.photos/400/200" alt="Card image" class="w-full h-48 object-cover" />' 
            : '';
        const buttonHtml = opts.hasButton 
            ? `<a href="#" class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">${opts.buttonText}</a>` 
            : '';

        return `<!-- CENTAUR LANG Generated Card: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="max-w-sm rounded-xl overflow-hidden shadow-lg ${bgClass}">
    ${imageHtml}
    <div class="p-6">
        <h3 class="text-xl font-bold mb-2">${opts.title}</h3>
        <p class="opacity-80">${opts.content}</p>
        ${buttonHtml}
    </div>
</div>`;
    }

    generateCardCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';

        return `.centaur-card {
    max-width: 350px;
    background: ${bg};
    color: ${text};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.centaur-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.centaur-card-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.centaur-card-body {
    padding: 1.5rem;
}

.centaur-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
}

.centaur-card-content {
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.centaur-card-button {
    display: inline-block;
    padding: 0.625rem 1.25rem;
    background: #e94560;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: background 0.2s;
}

.centaur-card-button:hover {
    background: #d63d5a;
}`;
    }

    generateCardJs(component) {
        return `// CENTAUR LANG Card: ${component.name}
console.log('🐴 CENTAUR Card loaded: ${component.name}');`;
    }

    /**
     * Generate Navigation component
     */
    generateNavigation(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindNavHtml(component, opts, isDark)
            : this.generateVanillaNavHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateNavCss(component, isDark);
        const js = this.generateNavJs(component);

        return { html, css, js };
    }

    generateVanillaNavHtml(component, opts, isDark) {
        const linksHtml = component.items
            .map(item => `<a href="${item.link}" class="centaur-nav-link">${item.text}</a>`)
            .join('\n            ');

        return `<!-- CENTAUR LANG Generated Navigation: ${component.name} -->
<nav id="${this.toKebabCase(component.name)}" class="centaur-nav ${isDark ? 'centaur-dark' : 'centaur-light'} ${opts.sticky ? 'centaur-nav-sticky' : ''}">
    <div class="centaur-nav-container">
        <a href="#" class="centaur-nav-logo">${opts.logo}</a>
        <button class="centaur-nav-toggle" aria-label="Toggle menu">
            <span></span><span></span><span></span>
        </button>
        <div class="centaur-nav-links">
            ${linksHtml}
        </div>
    </div>
</nav>`;
    }

    generateTailwindNavHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 shadow-md';
        const linksHtml = component.items
            .map(item => `<a href="${item.link}" class="hover:text-blue-500 transition-colors">${item.text}</a>`)
            .join('\n            ');

        return `<!-- CENTAUR LANG Generated Navigation: ${component.name} -->
<nav id="${this.toKebabCase(component.name)}" class="${opts.sticky ? 'sticky top-0 z-50' : ''} ${bgClass}">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" class="text-2xl font-bold">${opts.logo}</a>
        <div class="hidden md:flex space-x-6">
            ${linksHtml}
        </div>
        <button class="md:hidden p-2" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
    </div>
</nav>`;
    }

    generateNavCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';

        return `.centaur-nav {
    background: ${bg};
    color: ${text};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.centaur-nav-sticky {
    position: sticky;
    top: 0;
    z-index: 1000;
}

.centaur-nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.centaur-nav-logo {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
}

.centaur-nav-links {
    display: flex;
    gap: 2rem;
}

.centaur-nav-link {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    transition: color 0.2s;
}

.centaur-nav-link:hover {
    color: #e94560;
}

.centaur-nav-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.centaur-nav-toggle span {
    width: 24px;
    height: 2px;
    background: ${text};
    transition: 0.2s;
}

@media (max-width: 768px) {
    .centaur-nav-toggle { display: flex; }
    .centaur-nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: ${bg};
        flex-direction: column;
        padding: 1rem 2rem;
        gap: 1rem;
    }
    .centaur-nav-links.active { display: flex; }
}`;
    }

    generateNavJs(component) {
        const navId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Navigation: ${component.name}
document.querySelector('#${navId} .centaur-nav-toggle')?.addEventListener('click', function() {
    document.querySelector('#${navId} .centaur-nav-links')?.classList.toggle('active');
});
console.log('🐴 CENTAUR Navigation loaded: ${component.name}');`;
    }

    /**
     * NEW v0.3.0: Generate Modal component
     */
    generateModal(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindModalHtml(component, opts, isDark)
            : this.generateVanillaModalHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateModalCss(component, isDark);
        const js = this.generateModalJs(component);

        return { html, css, js };
    }

    generateVanillaModalHtml(component, opts, isDark) {
        const sizeClass = `centaur-modal-${opts.size}`;
        const closeBtn = opts.hasCloseButton 
            ? '<button class="centaur-modal-close" aria-label="Close">&times;</button>' 
            : '';
        
        let footerBtns = '';
        if (opts.hasCancelButton) {
            footerBtns += `<button class="centaur-modal-btn centaur-modal-cancel">${opts.cancelText}</button>`;
        }
        if (opts.hasConfirmButton) {
            footerBtns += `<button class="centaur-modal-btn centaur-modal-confirm">${opts.confirmText}</button>`;
        }
        const footer = footerBtns ? `<div class="centaur-modal-footer">${footerBtns}</div>` : '';

        return `<!-- CENTAUR LANG Generated Modal: ${component.name} -->
<button class="centaur-modal-trigger" data-modal="${this.toKebabCase(component.name)}">${opts.trigger}</button>

<div id="${this.toKebabCase(component.name)}" class="centaur-modal ${isDark ? 'centaur-dark' : 'centaur-light'}">
    <div class="centaur-modal-overlay"></div>
    <div class="centaur-modal-container ${sizeClass}">
        <div class="centaur-modal-header">
            <h3 class="centaur-modal-title">${opts.title}</h3>
            ${closeBtn}
        </div>
        <div class="centaur-modal-body">
            <p>${opts.content}</p>
        </div>
        ${footer}
    </div>
</div>`;
    }

    generateTailwindModalHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
        const sizeClasses = {
            small: 'max-w-sm',
            medium: 'max-w-lg',
            large: 'max-w-2xl'
        };
        const sizeClass = sizeClasses[opts.size] || sizeClasses.medium;

        const closeBtn = opts.hasCloseButton 
            ? '<button class="centaur-modal-close text-2xl hover:opacity-70">&times;</button>' 
            : '';

        let footerBtns = '';
        if (opts.hasCancelButton) {
            footerBtns += `<button class="centaur-modal-cancel px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors">${opts.cancelText}</button>`;
        }
        if (opts.hasConfirmButton) {
            footerBtns += `<button class="centaur-modal-confirm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">${opts.confirmText}</button>`;
        }
        const footer = footerBtns 
            ? `<div class="flex justify-end gap-3 p-4 border-t border-gray-200">${footerBtns}</div>` 
            : '';

        return `<!-- CENTAUR LANG Generated Modal: ${component.name} -->
<button class="centaur-modal-trigger px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-modal="${this.toKebabCase(component.name)}">
    ${opts.trigger}
</button>

<div id="${this.toKebabCase(component.name)}" class="centaur-modal fixed inset-0 z-50 hidden items-center justify-center">
    <div class="centaur-modal-overlay absolute inset-0 bg-black/50"></div>
    <div class="centaur-modal-container ${sizeClass} w-full mx-4 ${bgClass} rounded-xl shadow-2xl relative z-10">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 class="text-xl font-bold">${opts.title}</h3>
            ${closeBtn}
        </div>
        <div class="p-6">
            <p>${opts.content}</p>
        </div>
        ${footer}
    </div>
</div>`;
    }

    generateModalCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const overlay = 'rgba(0, 0, 0, 0.6)';

        return `.centaur-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
}

.centaur-modal.active {
    display: flex;
}

.centaur-modal-overlay {
    position: absolute;
    inset: 0;
    background: ${overlay};
}

.centaur-modal-container {
    position: relative;
    background: ${bg};
    color: ${text};
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-height: 90vh;
    overflow: hidden;
    animation: centaur-modal-in 0.3s ease;
}

.centaur-modal-small { width: 90%; max-width: 350px; }
.centaur-modal-medium { width: 90%; max-width: 500px; }
.centaur-modal-large { width: 90%; max-width: 700px; }

@keyframes centaur-modal-in {
    from { opacity: 0; transform: scale(0.95) translateY(-20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

.centaur-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid ${isDark ? '#333' : '#eee'};
}

.centaur-modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
}

.centaur-modal-close {
    background: none;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    transition: opacity 0.2s;
    line-height: 1;
}

.centaur-modal-close:hover { opacity: 1; }

.centaur-modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    max-height: 60vh;
}

.centaur-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid ${isDark ? '#333' : '#eee'};
}

.centaur-modal-btn {
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

.centaur-modal-cancel {
    background: ${isDark ? '#333' : '#e0e0e0'};
    color: ${text};
}

.centaur-modal-cancel:hover {
    background: ${isDark ? '#444' : '#d0d0d0'};
}

.centaur-modal-confirm {
    background: #e94560;
    color: white;
}

.centaur-modal-confirm:hover {
    background: #d63d5a;
}

.centaur-modal-trigger {
    padding: 0.75rem 1.5rem;
    background: #e94560;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.centaur-modal-trigger:hover {
    background: #d63d5a;
}`;
    }

    generateModalJs(component) {
        const modalId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Modal: ${component.name}
(function() {
    const modal = document.getElementById('${modalId}');
    if (!modal) return;

    const openModal = () => modal.classList.add('active');
    const closeModal = () => modal.classList.remove('active');

    // Trigger buttons
    document.querySelectorAll('[data-modal="${modalId}"]').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Close button
    modal.querySelector('.centaur-modal-close')?.addEventListener('click', closeModal);

    // Cancel button
    modal.querySelector('.centaur-modal-cancel')?.addEventListener('click', closeModal);

    // Overlay click
    modal.querySelector('.centaur-modal-overlay')?.addEventListener('click', closeModal);

    // Confirm button
    modal.querySelector('.centaur-modal-confirm')?.addEventListener('click', () => {
        modal.dispatchEvent(new CustomEvent('centaur:confirm', { bubbles: true }));
        closeModal();
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    console.log('🐴 CENTAUR Modal loaded: ${component.name}');
})();`;
    }

    /**
     * NEW v0.3.0: Generate Table component
     */
    generateTable(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindTableHtml(component, opts, isDark)
            : this.generateVanillaTableHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateTableCss(component, isDark);
        const js = this.generateTableJs(component);

        return { html, css, js };
    }

    generateVanillaTableHtml(component, opts, isDark) {
        const headerCells = component.columns.map(col => `<th>${col}</th>`).join('');
        
        let bodyRows = '';
        if (component.items.length > 0) {
            bodyRows = component.items.map(row => {
                const cells = row.map(cell => `<td>${cell}</td>`).join('');
                return `<tr>${cells}</tr>`;
            }).join('\n            ');
        } else {
            // Sample data
            for (let i = 1; i <= 5; i++) {
                const cells = component.columns.map((col, j) => {
                    if (j === 0) return `<td>${i}</td>`;
                    if (col.toLowerCase().includes('email')) return `<td>user${i}@example.com</td>`;
                    if (col.toLowerCase().includes('status')) return `<td><span class="centaur-badge">Active</span></td>`;
                    return `<td>Sample ${i}</td>`;
                }).join('');
                bodyRows += `<tr>${cells}</tr>\n            `;
            }
        }

        const searchHtml = opts.searchable 
            ? '<input type="text" class="centaur-table-search" placeholder="Search...">' 
            : '';

        const classes = [
            'centaur-table',
            isDark ? 'centaur-dark' : 'centaur-light',
            opts.striped ? 'centaur-striped' : '',
            opts.hoverable ? 'centaur-hoverable' : ''
        ].filter(Boolean).join(' ');

        return `<!-- CENTAUR LANG Generated Table: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-table-wrapper">
    ${searchHtml}
    <table class="${classes}">
        <thead>
            <tr>${headerCells}</tr>
        </thead>
        <tbody>
            ${bodyRows}
        </tbody>
    </table>
</div>`;
    }

    generateTailwindTableHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
        const headerBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
        
        const headerCells = component.columns.map(col => 
            `<th class="px-6 py-3 text-left text-sm font-semibold ${opts.sortable ? 'cursor-pointer hover:bg-gray-200' : ''}">${col}</th>`
        ).join('');

        let bodyRows = '';
        for (let i = 1; i <= 5; i++) {
            const cells = component.columns.map((col, j) => {
                if (j === 0) return `<td class="px-6 py-4">${i}</td>`;
                if (col.toLowerCase().includes('email')) return `<td class="px-6 py-4">user${i}@example.com</td>`;
                if (col.toLowerCase().includes('status')) return `<td class="px-6 py-4"><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span></td>`;
                return `<td class="px-6 py-4">Sample ${i}</td>`;
            }).join('');
            const rowClass = opts.striped && i % 2 === 0 ? (isDark ? 'bg-gray-750' : 'bg-gray-50') : '';
            const hoverClass = opts.hoverable ? (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100') : '';
            bodyRows += `<tr class="${rowClass} ${hoverClass}">${cells}</tr>\n            `;
        }

        const searchHtml = opts.searchable 
            ? `<input type="text" class="mb-4 w-full px-4 py-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}" placeholder="Search...">` 
            : '';

        return `<!-- CENTAUR LANG Generated Table: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="overflow-x-auto ${bgClass} rounded-xl shadow-lg p-4">
    ${searchHtml}
    <table class="w-full">
        <thead class="${headerBg}">
            <tr>${headerCells}</tr>
        </thead>
        <tbody class="divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}">
            ${bodyRows}
        </tbody>
    </table>
</div>`;
    }

    generateTableCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const headerBg = isDark ? '#16213e' : '#f8f9fa';
        const border = isDark ? '#333' : '#e0e0e0';
        const stripeBg = isDark ? '#16213e' : '#f8f9fa';
        const hoverBg = isDark ? '#0f3460' : '#f0f0f0';

        return `.centaur-table-wrapper {
    background: ${bg};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    overflow-x: auto;
}

.centaur-table-search {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    border: 2px solid ${border};
    border-radius: 8px;
    font-size: 1rem;
    background: ${isDark ? '#16213e' : '#fff'};
    color: ${text};
}

.centaur-table-search:focus {
    outline: none;
    border-color: #e94560;
}

.centaur-table {
    width: 100%;
    border-collapse: collapse;
    color: ${text};
}

.centaur-table th,
.centaur-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${border};
}

.centaur-table th {
    background: ${headerBg};
    font-weight: 600;
}

.centaur-striped tbody tr:nth-child(even) {
    background: ${stripeBg};
}

.centaur-hoverable tbody tr:hover {
    background: ${hoverBg};
}

.centaur-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #4ade80;
    color: #166534;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 500;
}`;
    }

    generateTableJs(component) {
        const tableId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Table: ${component.name}
(function() {
    const wrapper = document.getElementById('${tableId}');
    if (!wrapper) return;

    const searchInput = wrapper.querySelector('.centaur-table-search');
    const table = wrapper.querySelector('table');

    if (searchInput && table) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    console.log('🐴 CENTAUR Table loaded: ${component.name}');
})();`;
    }

    /**
     * NEW v0.3.0: Generate Footer component
     */
    generateFooter(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindFooterHtml(component, opts, isDark)
            : this.generateVanillaFooterHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateFooterCss(component, isDark);
        const js = this.generateFooterJs(component);

        return { html, css, js };
    }

    generateVanillaFooterHtml(component, opts, isDark) {
        let sectionsHtml = '';
        if (component.items.length > 0) {
            sectionsHtml = component.items.map(section => {
                const links = section.links.map(link => 
                    `<a href="${link.url}" class="centaur-footer-link">${link.text}</a>`
                ).join('\n                ');
                return `
            <div class="centaur-footer-section">
                <h4 class="centaur-footer-heading">${section.title}</h4>
                ${links}
            </div>`;
            }).join('');
        }

        let socialHtml = '';
        if (opts.hasSocial && opts.socialLinks.length > 0) {
            const socialLinks = opts.socialLinks.map(s => 
                `<a href="${s.url}" class="centaur-social-link" aria-label="${s.platform}">${this.getSocialIcon(s.platform)}</a>`
            ).join('');
            socialHtml = `<div class="centaur-footer-social">${socialLinks}</div>`;
        }

        return `<!-- CENTAUR LANG Generated Footer: ${component.name} -->
<footer id="${this.toKebabCase(component.name)}" class="centaur-footer ${isDark ? 'centaur-dark' : 'centaur-light'}">
    <div class="centaur-footer-container">
        <div class="centaur-footer-grid">
            ${sectionsHtml}
        </div>
        ${socialHtml}
        <div class="centaur-footer-bottom">
            <p>${opts.copyright}</p>
        </div>
    </div>
</footer>`;
    }

    generateTailwindFooterHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';

        let sectionsHtml = '';
        if (component.items.length > 0) {
            sectionsHtml = component.items.map(section => {
                const links = section.links.map(link => 
                    `<a href="${link.url}" class="block hover:text-blue-500 transition-colors">${link.text}</a>`
                ).join('\n                ');
                return `
            <div>
                <h4 class="font-bold mb-4">${section.title}</h4>
                <div class="space-y-2 opacity-80">
                    ${links}
                </div>
            </div>`;
            }).join('');
        }

        let socialHtml = '';
        if (opts.hasSocial && opts.socialLinks.length > 0) {
            const socialLinks = opts.socialLinks.map(s => 
                `<a href="${s.url}" class="hover:text-blue-500 transition-colors" aria-label="${s.platform}">${this.getSocialIcon(s.platform)}</a>`
            ).join('');
            socialHtml = `<div class="flex gap-4 justify-center mb-8">${socialLinks}</div>`;
        }

        return `<!-- CENTAUR LANG Generated Footer: ${component.name} -->
<footer id="${this.toKebabCase(component.name)}" class="${bgClass} py-12">
    <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            ${sectionsHtml}
        </div>
        ${socialHtml}
        <div class="text-center pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'} opacity-70">
            <p>${opts.copyright}</p>
        </div>
    </div>
</footer>`;
    }

    generateFooterCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#f8f9fa';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const border = isDark ? '#333' : '#e0e0e0';

        return `.centaur-footer {
    background: ${bg};
    color: ${text};
    padding: 3rem 0;
}

.centaur-footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.centaur-footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.centaur-footer-section h4 {
    font-weight: 700;
    margin-bottom: 1rem;
}

.centaur-footer-link {
    display: block;
    color: inherit;
    opacity: 0.8;
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: opacity 0.2s, color 0.2s;
}

.centaur-footer-link:hover {
    opacity: 1;
    color: #e94560;
}

.centaur-footer-social {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.centaur-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${isDark ? '#333' : '#e0e0e0'};
    color: inherit;
    transition: background 0.2s, transform 0.2s;
}

.centaur-social-link:hover {
    background: #e94560;
    color: white;
    transform: translateY(-2px);
}

.centaur-footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid ${border};
    opacity: 0.7;
}`;
    }

    generateFooterJs(component) {
        return `// CENTAUR LANG Footer: ${component.name}
console.log('🐴 CENTAUR Footer loaded: ${component.name}');`;
    }

    /**
     * NEW v0.3.0: Generate Gallery component
     */
    generateGallery(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const html = useTailwind
            ? this.generateTailwindGalleryHtml(component, opts, isDark)
            : this.generateVanillaGalleryHtml(component, opts, isDark);

        const css = useTailwind ? '' : this.generateGalleryCss(component, isDark);
        const js = this.generateGalleryJs(component);

        return { html, css, js };
    }

    generateVanillaGalleryHtml(component, opts, isDark) {
        const imagesHtml = component.items.map((img, i) => `
        <div class="centaur-gallery-item" data-index="${i}">
            <img src="${img.src}" alt="${img.alt}" loading="lazy" />
            ${img.caption ? `<div class="centaur-gallery-caption">${img.caption}</div>` : ''}
        </div>`).join('');

        const lightboxHtml = opts.lightbox ? `
    <div class="centaur-lightbox">
        <button class="centaur-lightbox-close">&times;</button>
        <button class="centaur-lightbox-prev">&#10094;</button>
        <button class="centaur-lightbox-next">&#10095;</button>
        <img src="" alt="" />
    </div>` : '';

        return `<!-- CENTAUR LANG Generated Gallery: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-gallery centaur-gallery-${opts.layout} ${isDark ? 'centaur-dark' : 'centaur-light'}" style="--columns: ${opts.gridColumns}">
    ${imagesHtml}
    ${lightboxHtml}
</div>`;
    }

    generateTailwindGalleryHtml(component, opts, isDark) {
        const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-100';
        const gridCols = `grid-cols-${Math.min(opts.gridColumns, 4)}`;

        const imagesHtml = component.items.map((img, i) => `
        <div class="centaur-gallery-item group relative overflow-hidden rounded-lg cursor-pointer" data-index="${i}">
            <img src="${img.src}" alt="${img.alt}" loading="lazy" class="w-full h-64 object-cover transition-transform group-hover:scale-110" />
            ${img.caption ? `<div class="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">${img.caption}</div>` : ''}
        </div>`).join('');

        return `<!-- CENTAUR LANG Generated Gallery: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="${bgClass} p-4 rounded-xl">
    <div class="grid ${gridCols} gap-4">
        ${imagesHtml}
    </div>
</div>`;
    }

    generateGalleryCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#f8f9fa';

        return `.centaur-gallery {
    padding: 1rem;
    background: ${bg};
    border-radius: 12px;
}

.centaur-gallery-grid {
    display: grid;
    grid-template-columns: repeat(var(--columns, 3), 1fr);
    gap: 1rem;
}

.centaur-gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
}

.centaur-gallery-item img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s;
}

.centaur-gallery-item:hover img {
    transform: scale(1.1);
}

.centaur-gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    opacity: 0;
    transition: opacity 0.3s;
}

.centaur-gallery-item:hover .centaur-gallery-caption {
    opacity: 1;
}

/* Lightbox */
.centaur-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.95);
    display: none;
    align-items: center;
    justify-content: center;
}

.centaur-lightbox.active {
    display: flex;
}

.centaur-lightbox img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
}

.centaur-lightbox-close,
.centaur-lightbox-prev,
.centaur-lightbox-next {
    position: absolute;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 1rem;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.centaur-lightbox-close:hover,
.centaur-lightbox-prev:hover,
.centaur-lightbox-next:hover {
    opacity: 1;
}

.centaur-lightbox-close { top: 1rem; right: 1rem; }
.centaur-lightbox-prev { left: 1rem; }
.centaur-lightbox-next { right: 1rem; }

@media (max-width: 768px) {
    .centaur-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}`;
    }

    generateGalleryJs(component) {
        const galleryId = this.toKebabCase(component.name);
        const opts = component.options;

        if (!opts.lightbox) {
            return `// CENTAUR LANG Gallery: ${component.name}
console.log('🐴 CENTAUR Gallery loaded: ${component.name}');`;
        }

        return `// CENTAUR LANG Gallery with Lightbox: ${component.name}
(function() {
    const gallery = document.getElementById('${galleryId}');
    if (!gallery) return;

    const lightbox = gallery.querySelector('.centaur-lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const items = gallery.querySelectorAll('.centaur-gallery-item');
    let currentIndex = 0;

    const images = Array.from(items).map(item => item.querySelector('img').src);

    const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        if (lightboxImg) lightboxImg.src = images[currentIndex];
    };

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            showImage(i);
            lightbox?.classList.add('active');
        });
    });

    lightbox?.querySelector('.centaur-lightbox-close')?.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox?.querySelector('.centaur-lightbox-prev')?.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    lightbox?.querySelector('.centaur-lightbox-next')?.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'Escape') lightbox.classList.remove('active');
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    console.log('🐴 CENTAUR Gallery loaded: ${component.name}');
})();`;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // NEW v0.4.0 COMPONENTS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * NEW v0.4.0: Parse accordion descriptions
     */
    parseAccordionDescription(component, desc, lines) {
        component.items = [];
        let currentItem = null;

        for (const line of lines) {
            // Match questions/titles with ## or Q: prefix
            const titleMatch = line.match(/^##?\s*(.+)/) ||
                              line.match(/^Q:\s*(.+)/i) ||
                              line.match(/^-\s*["']([^"']+)["']/);
            
            if (titleMatch) {
                if (currentItem) component.items.push(currentItem);
                currentItem = {
                    title: titleMatch[1].trim(),
                    content: ''
                };
            } else if (currentItem && line.trim()) {
                // Content lines (A: prefix or plain text)
                const contentMatch = line.match(/^A:\s*(.+)/i);
                currentItem.content += (contentMatch ? contentMatch[1] : line.trim()) + ' ';
            }
        }

        if (currentItem) component.items.push(currentItem);

        // Default items if none found
        if (component.items.length === 0) {
            component.items = [
                { title: 'What is CENTAUR?', content: 'CENTAUR is the world\'s first Human+AI creative partnership, combining human vision with AI capabilities.' },
                { title: 'How does it work?', content: 'You write natural language descriptions, and CENTAUR compiles them into production-ready HTML, CSS, and JavaScript.' },
                { title: 'Is it free?', content: 'Yes, CENTAUR LANG is open source and free to use under the MIT license.' }
            ];
        }

        component.options.allowMultiple = /multiple|multi/i.test(desc);
        component.options.defaultOpen = /open|expanded/i.test(desc) ? 0 : -1;
    }

    /**
     * NEW v0.4.0: Parse tabs descriptions
     */
    parseTabsDescription(component, desc, lines) {
        component.items = [];
        let currentTab = null;

        for (const line of lines) {
            const tabMatch = line.match(/^##?\s*(.+)/) ||
                            line.match(/^Tab:\s*(.+)/i) ||
                            line.match(/^-\s*["']([^"']+)["']/);
            
            if (tabMatch) {
                if (currentTab) component.items.push(currentTab);
                currentTab = {
                    title: tabMatch[1].trim(),
                    content: ''
                };
            } else if (currentTab && line.trim()) {
                currentTab.content += line.trim() + ' ';
            }
        }

        if (currentTab) component.items.push(currentTab);

        // Default tabs if none found
        if (component.items.length === 0) {
            component.items = [
                { title: 'Overview', content: 'CENTAUR LANG is a revolutionary Human+AI programming language that transforms natural language into code.' },
                { title: 'Features', content: 'Natural language parsing, multiple components, dark/light themes, Tailwind support, and more.' },
                { title: 'Getting Started', content: 'Include the compiler, write your .centaur file, and compile to HTML/CSS/JS.' }
            ];
        }

        component.options.vertical = /vertical/i.test(desc);
        component.options.pills = /pills?/i.test(desc);
    }

    /**
     * NEW v0.4.0: Parse carousel descriptions
     */
    parseCarouselDescription(component, desc, lines) {
        component.items = [];

        for (const line of lines) {
            const slideMatch = line.match(/^-\s*(.+)/);
            if (slideMatch) {
                const slideText = slideMatch[1].trim();
                component.items.push({
                    image: `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 100)}`,
                    title: slideText,
                    description: ''
                });
            }
        }

        // Default slides if none found
        if (component.items.length === 0) {
            for (let i = 1; i <= 4; i++) {
                component.items.push({
                    image: `https://picsum.photos/800/400?random=${i}`,
                    title: `Slide ${i}`,
                    description: `Description for slide ${i}`
                });
            }
        }

        component.options.autoplay = /auto/i.test(desc);
        component.options.interval = 5000;
        component.options.showDots = !/no.*dots/i.test(desc);
        component.options.showArrows = !/no.*arrows/i.test(desc);

        const intervalMatch = desc.match(/(\d+)\s*(?:seconds?|s)/i);
        if (intervalMatch) {
            component.options.interval = parseInt(intervalMatch[1]) * 1000;
        }
    }

    /**
     * NEW v0.4.0: Parse pricing descriptions
     */
    parsePricingDescription(component, desc, lines) {
        component.items = [];
        let currentPlan = null;

        for (const line of lines) {
            // Plan header: ## Basic, ## Pro, etc.
            const planMatch = line.match(/^##?\s*(.+)/);
            if (planMatch) {
                if (currentPlan) component.items.push(currentPlan);
                currentPlan = {
                    name: planMatch[1].trim(),
                    price: '$0',
                    period: '/month',
                    features: [],
                    highlighted: false,
                    buttonText: 'Get Started'
                };
            } else if (currentPlan) {
                // Price line: $29/month, $99/year
                const priceMatch = line.match(/\$(\d+)(?:\/(\w+))?/);
                if (priceMatch) {
                    currentPlan.price = '$' + priceMatch[1];
                    currentPlan.period = priceMatch[2] ? '/' + priceMatch[2] : '/month';
                }
                // Feature line: - Feature name
                const featureMatch = line.match(/^-\s*(.+)/);
                if (featureMatch) {
                    currentPlan.features.push(featureMatch[1].trim());
                }
                // Highlighted/recommended
                if (/popular|recommended|featured|highlight/i.test(line)) {
                    currentPlan.highlighted = true;
                }
                // Button text
                const buttonMatch = line.match(/button.*["']([^"']+)["']/i);
                if (buttonMatch) {
                    currentPlan.buttonText = buttonMatch[1];
                }
            }
        }

        if (currentPlan) component.items.push(currentPlan);

        // Default plans if none found
        if (component.items.length === 0) {
            component.items = [
                {
                    name: 'Starter',
                    price: '$9',
                    period: '/month',
                    features: ['5 Projects', 'Basic Support', '1GB Storage', 'Email Notifications'],
                    highlighted: false,
                    buttonText: 'Start Free Trial'
                },
                {
                    name: 'Professional',
                    price: '$29',
                    period: '/month',
                    features: ['Unlimited Projects', 'Priority Support', '10GB Storage', 'Advanced Analytics', 'Custom Domain'],
                    highlighted: true,
                    buttonText: 'Get Started'
                },
                {
                    name: 'Enterprise',
                    price: '$99',
                    period: '/month',
                    features: ['Everything in Pro', '24/7 Support', 'Unlimited Storage', 'API Access', 'Custom Integrations', 'SLA Guarantee'],
                    highlighted: false,
                    buttonText: 'Contact Sales'
                }
            ];
        }
    }

    /**
     * NEW v0.4.0: Parse testimonial descriptions
     */
    parseTestimonialDescription(component, desc, lines) {
        component.items = [];
        let currentTestimonial = null;

        for (const line of lines) {
            // Quote line starts with > or "
            const quoteMatch = line.match(/^>\s*["']?(.+)["']?$/) ||
                              line.match(/^["'](.+)["']$/);
            if (quoteMatch) {
                if (currentTestimonial) component.items.push(currentTestimonial);
                currentTestimonial = {
                    quote: quoteMatch[1].trim(),
                    author: 'Anonymous',
                    role: '',
                    company: '',
                    avatar: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`
                };
            } else if (currentTestimonial) {
                // Author line: - Name, Role at Company
                const authorMatch = line.match(/^-\s*(.+)/);
                if (authorMatch) {
                    const authorText = authorMatch[1].trim();
                    const parts = authorText.split(/,\s*|\s+at\s+/i);
                    currentTestimonial.author = parts[0] || 'Anonymous';
                    currentTestimonial.role = parts[1] || '';
                    currentTestimonial.company = parts[2] || '';
                }
            }
        }

        if (currentTestimonial) component.items.push(currentTestimonial);

        // Default testimonials if none found
        if (component.items.length === 0) {
            component.items = [
                {
                    quote: 'CENTAUR LANG has completely transformed how we build web components. What used to take hours now takes minutes!',
                    author: 'Sarah Johnson',
                    role: 'Lead Developer',
                    company: 'TechCorp',
                    avatar: 'https://i.pravatar.cc/100?img=1'
                },
                {
                    quote: 'The natural language approach makes it accessible to designers who don\'t code. Game changer for our team.',
                    author: 'Michael Chen',
                    role: 'Design Director',
                    company: 'Creative Agency',
                    avatar: 'https://i.pravatar.cc/100?img=2'
                },
                {
                    quote: 'Finally, a tool that truly bridges the gap between human creativity and AI capability. Highly recommended!',
                    author: 'Emma Williams',
                    role: 'Freelance Designer',
                    company: '',
                    avatar: 'https://i.pravatar.cc/100?img=3'
                }
            ];
        }

        component.options.layout = /grid/i.test(desc) ? 'grid' : 'carousel';
        component.options.showStars = /stars?|rating/i.test(desc);
    }

    /**
     * NEW v0.4.0: Generate Accordion component
     */
    generateAccordion(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';

        const itemsHtml = component.items.map((item, i) => {
            const isOpen = component.options.defaultOpen === i;
            if (useTailwind) {
                return `
        <div class="centaur-accordion-item border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}">
            <button class="centaur-accordion-trigger w-full flex justify-between items-center py-4 px-6 text-left font-semibold ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}" data-index="${i}">
                <span>${item.title}</span>
                <svg class="w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
            </button>
            <div class="centaur-accordion-content overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}">
                <div class="px-6 pb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}">
                    ${item.content}
                </div>
            </div>
        </div>`;
            } else {
                return `
        <div class="centaur-accordion-item ${isOpen ? 'active' : ''}">
            <button class="centaur-accordion-trigger" data-index="${i}">
                <span>${item.title}</span>
                <span class="centaur-accordion-icon">▼</span>
            </button>
            <div class="centaur-accordion-content">
                <div class="centaur-accordion-inner">
                    ${item.content}
                </div>
            </div>
        </div>`;
            }
        }).join('');

        const html = useTailwind
            ? `<!-- CENTAUR LANG Generated Accordion: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-accordion ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-xl overflow-hidden shadow-lg" data-allow-multiple="${component.options.allowMultiple}">
    ${itemsHtml}
</div>`
            : `<!-- CENTAUR LANG Generated Accordion: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-accordion ${isDark ? 'centaur-dark' : 'centaur-light'}" data-allow-multiple="${component.options.allowMultiple}">
    ${itemsHtml}
</div>`;

        const css = useTailwind ? '' : this.generateAccordionCss(component, isDark);
        const js = this.generateAccordionJs(component);

        return { html, css, js };
    }

    generateAccordionCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const border = isDark ? '#333' : '#e0e0e0';
        const hoverBg = isDark ? '#16213e' : '#f8f9fa';

        return `.centaur-accordion {
    background: ${bg};
    color: ${text};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.centaur-accordion-item {
    border-bottom: 1px solid ${border};
}

.centaur-accordion-item:last-child {
    border-bottom: none;
}

.centaur-accordion-trigger {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: none;
    border: none;
    color: inherit;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    text-align: left;
}

.centaur-accordion-trigger:hover {
    background: ${hoverBg};
}

.centaur-accordion-icon {
    transition: transform 0.3s;
    font-size: 0.8rem;
}

.centaur-accordion-item.active .centaur-accordion-icon {
    transform: rotate(180deg);
}

.centaur-accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.centaur-accordion-item.active .centaur-accordion-content {
    max-height: 500px;
}

.centaur-accordion-inner {
    padding: 0 1.5rem 1.25rem;
    opacity: 0.8;
    line-height: 1.6;
}`;
    }

    generateAccordionJs(component) {
        const accordionId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Accordion: ${component.name}
(function() {
    const accordion = document.getElementById('${accordionId}');
    if (!accordion) return;

    const allowMultiple = accordion.dataset.allowMultiple === 'true';
    const triggers = accordion.querySelectorAll('.centaur-accordion-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.centaur-accordion-item');
            const isActive = item.classList.contains('active');

            if (!allowMultiple) {
                accordion.querySelectorAll('.centaur-accordion-item').forEach(i => {
                    i.classList.remove('active');
                });
            }

            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    console.log('🐴 CENTAUR Accordion loaded: ${component.name}');
})();`;
    }

    /**
     * NEW v0.4.0: Generate Tabs component
     */
    generateTabs(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';

        const tabsHtml = component.items.map((item, i) => {
            const isActive = i === 0;
            if (useTailwind) {
                const activeClass = isActive ? (isDark ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white') : '';
                return `<button class="centaur-tab-btn px-6 py-3 font-semibold rounded-t-lg transition-colors ${activeClass} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}" data-tab="${i}">${item.title}</button>`;
            } else {
                return `<button class="centaur-tab-btn ${isActive ? 'active' : ''}" data-tab="${i}">${item.title}</button>`;
            }
        }).join('\n            ');

        const panelsHtml = component.items.map((item, i) => {
            const isActive = i === 0;
            if (useTailwind) {
                return `<div class="centaur-tab-panel p-6 ${isActive ? '' : 'hidden'}" data-panel="${i}">${item.content}</div>`;
            } else {
                return `<div class="centaur-tab-panel ${isActive ? 'active' : ''}" data-panel="${i}">${item.content}</div>`;
            }
        }).join('\n        ');

        const html = useTailwind
            ? `<!-- CENTAUR LANG Generated Tabs: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-tabs ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-xl overflow-hidden shadow-lg">
    <div class="centaur-tab-list flex ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}">
        ${tabsHtml}
    </div>
    <div class="centaur-tab-panels">
        ${panelsHtml}
    </div>
</div>`
            : `<!-- CENTAUR LANG Generated Tabs: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-tabs ${isDark ? 'centaur-dark' : 'centaur-light'}">
    <div class="centaur-tab-list">
        ${tabsHtml}
    </div>
    <div class="centaur-tab-panels">
        ${panelsHtml}
    </div>
</div>`;

        const css = useTailwind ? '' : this.generateTabsCss(component, isDark);
        const js = this.generateTabsJs(component);

        return { html, css, js };
    }

    generateTabsCss(component, isDark) {
        const bg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const tabBg = isDark ? '#16213e' : '#f0f0f0';
        const activeBg = isDark ? '#e94560' : '#3b82f6';

        return `.centaur-tabs {
    background: ${bg};
    color: ${text};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.centaur-tab-list {
    display: flex;
    background: ${tabBg};
    border-bottom: 1px solid ${isDark ? '#333' : '#e0e0e0'};
}

.centaur-tab-btn {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    color: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    border-bottom: 3px solid transparent;
}

.centaur-tab-btn:hover {
    background: ${isDark ? '#333' : '#e0e0e0'};
}

.centaur-tab-btn.active {
    background: ${activeBg};
    color: white;
    border-bottom-color: ${activeBg};
}

.centaur-tab-panel {
    display: none;
    padding: 1.5rem;
    line-height: 1.6;
}

.centaur-tab-panel.active {
    display: block;
}`;
    }

    generateTabsJs(component) {
        const tabsId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Tabs: ${component.name}
(function() {
    const tabs = document.getElementById('${tabsId}');
    if (!tabs) return;

    const buttons = tabs.querySelectorAll('.centaur-tab-btn');
    const panels = tabs.querySelectorAll('.centaur-tab-panel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.tab;

            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => {
                p.classList.remove('active');
                p.classList.add('hidden');
            });

            btn.classList.add('active');
            const panel = tabs.querySelector('[data-panel="' + index + '"]');
            if (panel) {
                panel.classList.add('active');
                panel.classList.remove('hidden');
            }
        });
    });

    console.log('🐴 CENTAUR Tabs loaded: ${component.name}');
})();`;
    }

    /**
     * NEW v0.4.0: Generate Carousel component
     */
    generateCarousel(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const slidesHtml = component.items.map((item, i) => {
            if (useTailwind) {
                return `
            <div class="centaur-slide min-w-full ${i === 0 ? '' : 'hidden'}" data-slide="${i}">
                <img src="${item.image}" alt="${item.title}" class="w-full h-64 md:h-96 object-cover">
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 class="text-2xl font-bold text-white">${item.title}</h3>
                    ${item.description ? `<p class="text-white/80 mt-2">${item.description}</p>` : ''}
                </div>
            </div>`;
            } else {
                return `
            <div class="centaur-slide ${i === 0 ? 'active' : ''}" data-slide="${i}">
                <img src="${item.image}" alt="${item.title}">
                <div class="centaur-slide-caption">
                    <h3>${item.title}</h3>
                    ${item.description ? `<p>${item.description}</p>` : ''}
                </div>
            </div>`;
            }
        }).join('');

        const dotsHtml = opts.showDots ? component.items.map((_, i) => {
            if (useTailwind) {
                return `<button class="centaur-dot w-3 h-3 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}" data-dot="${i}"></button>`;
            } else {
                return `<button class="centaur-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></button>`;
            }
        }).join('') : '';

        const arrowsHtml = opts.showArrows ? (useTailwind 
            ? `<button class="centaur-prev absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full text-white text-2xl">&#10094;</button>
            <button class="centaur-next absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full text-white text-2xl">&#10095;</button>`
            : `<button class="centaur-prev">&#10094;</button>
            <button class="centaur-next">&#10095;</button>`) : '';

        const html = useTailwind
            ? `<!-- CENTAUR LANG Generated Carousel: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-carousel relative overflow-hidden rounded-xl shadow-lg" data-autoplay="${opts.autoplay}" data-interval="${opts.interval}">
    <div class="centaur-slides relative">
        ${slidesHtml}
    </div>
    ${arrowsHtml}
    ${dotsHtml ? `<div class="centaur-dots absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">${dotsHtml}</div>` : ''}
</div>`
            : `<!-- CENTAUR LANG Generated Carousel: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-carousel ${isDark ? 'centaur-dark' : 'centaur-light'}" data-autoplay="${opts.autoplay}" data-interval="${opts.interval}">
    <div class="centaur-slides">
        ${slidesHtml}
    </div>
    ${arrowsHtml}
    ${dotsHtml ? `<div class="centaur-dots">${dotsHtml}</div>` : ''}
</div>`;

        const css = useTailwind ? '' : this.generateCarouselCss(component, isDark);
        const js = this.generateCarouselJs(component);

        return { html, css, js };
    }

    generateCarouselCss(component, isDark) {
        return `.centaur-carousel {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.centaur-slides {
    position: relative;
    width: 100%;
}

.centaur-slide {
    display: none;
    position: relative;
}

.centaur-slide.active {
    display: block;
}

.centaur-slide img {
    width: 100%;
    height: 400px;
    object-fit: cover;
}

.centaur-slide-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
}

.centaur-slide-caption h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.centaur-slide-caption p {
    opacity: 0.9;
}

.centaur-prev, .centaur-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.2s;
    z-index: 10;
}

.centaur-prev:hover, .centaur-next:hover {
    background: rgba(0, 0, 0, 0.8);
}

.centaur-prev { left: 1rem; }
.centaur-next { right: 1rem; }

.centaur-dots {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
}

.centaur-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.2s;
}

.centaur-dot.active, .centaur-dot:hover {
    background: white;
}`;
    }

    generateCarouselJs(component) {
        const carouselId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Carousel: ${component.name}
(function() {
    const carousel = document.getElementById('${carouselId}');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.centaur-slide');
    const dots = carousel.querySelectorAll('.centaur-dot');
    const prevBtn = carousel.querySelector('.centaur-prev');
    const nextBtn = carousel.querySelector('.centaur-next');
    
    let currentIndex = 0;
    const autoplay = carousel.dataset.autoplay === 'true';
    const interval = parseInt(carousel.dataset.interval) || 5000;
    let autoplayTimer = null;

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
            slide.classList.toggle('hidden', i !== currentIndex);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
            dot.classList.toggle('bg-white', i === currentIndex);
            dot.classList.toggle('bg-white/50', i !== currentIndex);
        });
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    if (autoplay) {
        autoplayTimer = setInterval(nextSlide, interval);
        
        carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        carousel.addEventListener('mouseleave', () => {
            autoplayTimer = setInterval(nextSlide, interval);
        });
    }

    // Touch support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    });

    console.log('🐴 CENTAUR Carousel loaded: ${component.name}');
})();`;
    }

    /**
     * NEW v0.4.0: Generate Pricing component
     */
    generatePricing(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';

        const plansHtml = component.items.map((plan) => {
            const featuresHtml = plan.features.map(f => {
                if (useTailwind) {
                    return `<li class="flex items-center gap-2"><span class="text-green-500">✓</span> ${f}</li>`;
                } else {
                    return `<li><span class="check">✓</span> ${f}</li>`;
                }
            }).join('');

            if (useTailwind) {
                const highlightClass = plan.highlighted 
                    ? 'border-2 border-blue-500 scale-105 shadow-2xl' 
                    : 'border border-gray-200';
                return `
            <div class="centaur-pricing-card ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 ${highlightClass} relative">
                ${plan.highlighted ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>' : ''}
                <h3 class="text-xl font-bold mb-2">${plan.name}</h3>
                <div class="text-4xl font-bold mb-1">${plan.price}<span class="text-lg font-normal opacity-70">${plan.period}</span></div>
                <ul class="space-y-3 my-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}">
                    ${featuresHtml}
                </ul>
                <button class="w-full py-3 px-6 ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700 text-white' : isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} rounded-lg font-semibold transition-colors">
                    ${plan.buttonText}
                </button>
            </div>`;
            } else {
                return `
            <div class="centaur-pricing-card ${plan.highlighted ? 'highlighted' : ''}">
                ${plan.highlighted ? '<div class="popular-badge">Most Popular</div>' : ''}
                <h3 class="plan-name">${plan.name}</h3>
                <div class="plan-price">${plan.price}<span>${plan.period}</span></div>
                <ul class="plan-features">
                    ${featuresHtml}
                </ul>
                <button class="plan-button">${plan.buttonText}</button>
            </div>`;
            }
        }).join('');

        const html = useTailwind
            ? `<!-- CENTAUR LANG Generated Pricing: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-pricing py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}">
    <div class="max-w-6xl mx-auto px-4">
        <div class="grid md:grid-cols-${component.items.length} gap-8 items-center">
            ${plansHtml}
        </div>
    </div>
</div>`
            : `<!-- CENTAUR LANG Generated Pricing: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-pricing ${isDark ? 'centaur-dark' : 'centaur-light'}">
    <div class="centaur-pricing-grid">
        ${plansHtml}
    </div>
</div>`;

        const css = useTailwind ? '' : this.generatePricingCss(component, isDark);
        const js = this.generatePricingJs(component);

        return { html, css, js };
    }

    generatePricingCss(component, isDark) {
        const bg = isDark ? '#0f0f1a' : '#f8f9fa';
        const cardBg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';
        const accent = '#3b82f6';

        return `.centaur-pricing {
    background: ${bg};
    color: ${text};
    padding: 4rem 2rem;
}

.centaur-pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
}

.centaur-pricing-card {
    background: ${cardBg};
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
    position: relative;
    transition: transform 0.3s, box-shadow 0.3s;
    border: 1px solid ${isDark ? '#333' : '#e0e0e0'};
}

.centaur-pricing-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.centaur-pricing-card.highlighted {
    border: 2px solid ${accent};
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

.popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: ${accent};
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
}

.plan-name {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.plan-price {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
}

.plan-price span {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
}

.plan-features {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.plan-features li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.plan-features .check {
    color: #22c55e;
    font-weight: bold;
}

.plan-button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    background: ${isDark ? '#333' : '#e0e0e0'};
    color: ${text};
}

.centaur-pricing-card.highlighted .plan-button {
    background: ${accent};
    color: white;
}

.plan-button:hover {
    opacity: 0.9;
}`;
    }

    generatePricingJs(component) {
        return `// CENTAUR LANG Pricing: ${component.name}
console.log('🐴 CENTAUR Pricing loaded: ${component.name}');`;
    }

    /**
     * NEW v0.4.0: Generate Testimonial component
     */
    generateTestimonial(component) {
        const isDark = component.theme === 'dark';
        const useTailwind = component.style === 'tailwind';
        const opts = component.options;

        const testimonialsHtml = component.items.map((item, i) => {
            const starsHtml = opts.showStars ? '<div class="stars">★★★★★</div>' : '';
            
            if (useTailwind) {
                return `
            <div class="centaur-testimonial-card ${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg ${opts.layout === 'carousel' && i > 0 ? 'hidden' : ''}" data-testimonial="${i}">
                ${opts.showStars ? '<div class="text-yellow-400 text-xl mb-4">★★★★★</div>' : ''}
                <blockquote class="text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'} italic">"${item.quote}"</blockquote>
                <div class="flex items-center gap-4">
                    <img src="${item.avatar}" alt="${item.author}" class="w-14 h-14 rounded-full object-cover">
                    <div>
                        <div class="font-bold">${item.author}</div>
                        <div class="text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}">${item.role}${item.company ? ' at ' + item.company : ''}</div>
                    </div>
                </div>
            </div>`;
            } else {
                return `
            <div class="centaur-testimonial-card ${opts.layout === 'carousel' && i > 0 ? '' : 'active'}" data-testimonial="${i}">
                ${starsHtml}
                <blockquote>"${item.quote}"</blockquote>
                <div class="author-info">
                    <img src="${item.avatar}" alt="${item.author}">
                    <div>
                        <div class="author-name">${item.author}</div>
                        <div class="author-role">${item.role}${item.company ? ' at ' + item.company : ''}</div>
                    </div>
                </div>
            </div>`;
            }
        }).join('');

        const dotsHtml = opts.layout === 'carousel' ? component.items.map((_, i) => 
            `<button class="centaur-testimonial-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></button>`
        ).join('') : '';

        const html = useTailwind
            ? `<!-- CENTAUR LANG Generated Testimonials: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-testimonials py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}" data-layout="${opts.layout}">
    <div class="max-w-6xl mx-auto px-4">
        <div class="${opts.layout === 'grid' ? 'grid md:grid-cols-3 gap-8' : 'relative'}">
            ${testimonialsHtml}
        </div>
        ${dotsHtml ? `<div class="flex justify-center gap-2 mt-8">${dotsHtml}</div>` : ''}
    </div>
</div>`
            : `<!-- CENTAUR LANG Generated Testimonials: ${component.name} -->
<div id="${this.toKebabCase(component.name)}" class="centaur-testimonials ${isDark ? 'centaur-dark' : 'centaur-light'}" data-layout="${opts.layout}">
    <div class="centaur-testimonials-container ${opts.layout}">
        ${testimonialsHtml}
    </div>
    ${dotsHtml ? `<div class="centaur-testimonial-dots">${dotsHtml}</div>` : ''}
</div>`;

        const css = useTailwind ? '' : this.generateTestimonialCss(component, isDark);
        const js = this.generateTestimonialJs(component);

        return { html, css, js };
    }

    generateTestimonialCss(component, isDark) {
        const bg = isDark ? '#0f0f1a' : '#f8f9fa';
        const cardBg = isDark ? '#1a1a2e' : '#ffffff';
        const text = isDark ? '#ffffff' : '#1a1a2e';

        return `.centaur-testimonials {
    background: ${bg};
    color: ${text};
    padding: 4rem 2rem;
}

.centaur-testimonials-container {
    max-width: 1200px;
    margin: 0 auto;
}

.centaur-testimonials-container.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.centaur-testimonials-container.carousel {
    position: relative;
}

.centaur-testimonial-card {
    background: ${cardBg};
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.centaur-testimonials-container.carousel .centaur-testimonial-card {
    display: none;
}

.centaur-testimonials-container.carousel .centaur-testimonial-card.active {
    display: block;
}

.stars {
    color: #fbbf24;
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

blockquote {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-style: italic;
    opacity: 0.9;
}

.author-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.author-info img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
}

.author-name {
    font-weight: 700;
}

.author-role {
    font-size: 0.9rem;
    opacity: 0.7;
}

.centaur-testimonial-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
}

.centaur-testimonial-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: ${isDark ? '#333' : '#ddd'};
    cursor: pointer;
    transition: background 0.2s;
}

.centaur-testimonial-dot.active {
    background: #e94560;
}`;
    }

    generateTestimonialJs(component) {
        const testimonialsId = this.toKebabCase(component.name);
        return `// CENTAUR LANG Testimonials: ${component.name}
(function() {
    const container = document.getElementById('${testimonialsId}');
    if (!container) return;

    const layout = container.dataset.layout;
    if (layout !== 'carousel') {
        console.log('🐴 CENTAUR Testimonials loaded: ${component.name}');
        return;
    }

    const cards = container.querySelectorAll('.centaur-testimonial-card');
    const dots = container.querySelectorAll('.centaur-testimonial-dot');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        currentIndex = (index + cards.length) % cards.length;
        
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === currentIndex);
            card.classList.toggle('hidden', i !== currentIndex);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showTestimonial(i));
    });

    // Auto-rotate every 6 seconds
    setInterval(() => showTestimonial(currentIndex + 1), 6000);

    console.log('🐴 CENTAUR Testimonials loaded: ${component.name}');
})();`;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════

    getSocialIcon(platform) {
        const icons = {
            facebook: '𝕗',
            twitter: '𝕏',
            x: '𝕏',
            instagram: '📷',
            linkedin: 'in',
            youtube: '▶',
            github: '⌘',
            tiktok: '♪'
        };
        return icons[platform.toLowerCase()] || '●';
    }

    toKebabCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/\s+/g, '-')
            .toLowerCase();
    }

    /**
     * Generate complete HTML file with all components
     */
    generateFullHtml(source) {
        const result = this.compile(source);
        
        let allCss = '';
        let allJs = '';
        let allHtml = '';

        for (const output of result.outputs) {
            allHtml += output.html + '\n\n';
            if (output.css) allCss += output.css + '\n\n';
            allJs += output.js + '\n\n';
        }

        const useTailwind = source.includes('@style tailwind');
        const tailwindCdn = useTailwind 
            ? '<script src="https://cdn.tailwindcss.com"></script>' 
            : '';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CENTAUR LANG v${this.version} Output</title>
    ${tailwindCdn}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${allCss}
    </style>
</head>
<body>
    <!-- 
    ╔═══════════════════════════════════════════════════════════════════════════╗
    ║  Generated by CENTAUR LANG v${this.version}                                        ║
    ║  Human+AI Code Protocol (HACP)                                            ║
    ║  Human: Chris Conen | AI: Claude (Anthropic)                              ║
    ║  "Neither human alone, nor AI alone — but something greater together."    ║
    ╚═══════════════════════════════════════════════════════════════════════════╝
    -->

${allHtml}

    <script>
${allJs}
    </script>
</body>
</html>`;
    }
}

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CentaurCompiler;
}
if (typeof window !== 'undefined') {
    window.CentaurCompiler = CentaurCompiler;
}
