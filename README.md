# 🐴 CENTAUR LANG

> **The World's First Human+AI Programming Language**

[![Version](https://img.shields.io/badge/version-0.4.0-blue.svg)](https://github.com/Centaur-Lang/centaur-lang)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HACP](https://img.shields.io/badge/HACP-Human%2BAI-gold.svg)](https://centaur.australianweb.agency)
[![Components](https://img.shields.io/badge/components-13-orange.svg)](https://centaur-lang.dev)

**CENTAUR LANG** transforms natural language descriptions into production-ready HTML, CSS, and JavaScript components.

```
"Neither human alone, nor AI alone — but something greater together."
```

---

## 🚀 Quick Start

### 1. Include the Compiler

```html
<script src="compiler.js"></script>
```

### 2. Write CENTAUR Code

```centaur
@component ContactForm
@type form
@theme dark

{
  Create a contact form with
  name field, email field,
  message textarea,
  submit button "Send Message"
}
```

### 3. Compile & Use

```javascript
const compiler = new CentaurCompiler();
const result = compiler.compile(centaurCode);

// Get the generated HTML
document.body.innerHTML = result.outputs[0].html;
```

---

## 📦 Components (v0.4.0)

### 13 Production-Ready Components!

| Component | Description | Since |
|-----------|-------------|-------|
| **Form** | Contact forms, login forms, any input form | v0.1.0 |
| **Hero** | Landing page hero sections with CTA | v0.2.0 |
| **Card** | Content cards with images and buttons | v0.2.0 |
| **Navigation** | Responsive navbar with mobile menu | v0.2.0 |
| **Modal** | Popup dialogs with confirm/cancel | v0.3.0 |
| **Table** | Data tables with search & hover | v0.3.0 |
| **Footer** | Multi-column footers with social links | v0.3.0 |
| **Gallery** | Image galleries with lightbox | v0.3.0 |
| **Accordion** | Collapsible FAQ sections | v0.4.0 🆕 |
| **Tabs** | Tabbed content interface | v0.4.0 🆕 |
| **Carousel** | Image sliders with autoplay | v0.4.0 🆕 |
| **Pricing** | Pricing tables with plans | v0.4.0 🆕 |
| **Testimonial** | Customer reviews & quotes | v0.4.0 🆕 |

---

## 🎨 Directives

### Core Directives

| Directive | Description | Example |
|-----------|-------------|---------|
| `@component` | Component name | `@component MyForm` |
| `@type` | Component type | `@type form` |
| `@theme` | Color theme | `@theme dark` or `@theme light` |
| `@style` | CSS framework | `@style tailwind` or `@style vanilla` |

### Component-Specific Directives

| Directive | Component | Example |
|-----------|-----------|---------|
| `@size` | Modal | `@size small/medium/large` |
| `@columns` | Table | `@columns ID, Name, Email` |
| `@trigger` | Modal | `@trigger "Open Dialog"` |

---

## 📝 Examples

### Accordion Component (NEW in v0.4.0)

```centaur
@component FAQ
@type accordion
@theme dark

{
  ## What is CENTAUR?
  CENTAUR is the world's first Human+AI programming language.
  
  ## How does it work?
  Write natural language, get production code.
  
  ## Is it free?
  Yes! MIT license.
}
```

### Tabs Component (NEW in v0.4.0)

```centaur
@component ProductInfo
@type tabs
@theme dark

{
  ## Overview
  Product description here.
  
  ## Features
  List of features.
  
  ## Pricing
  Pricing information.
}
```

### Carousel Component (NEW in v0.4.0)

```centaur
@component ImageSlider
@type carousel
@theme dark

{
  Create an image slider with
  autoplay 5 seconds
  - Slide One
  - Slide Two
  - Slide Three
}
```

### Pricing Component (NEW in v0.4.0)

```centaur
@component Plans
@type pricing
@theme dark

{
  ## Starter
  $9/month
  - 5 Projects
  - Basic Support
  
  ## Professional
  $29/month
  popular
  - Unlimited Projects
  - Priority Support
  
  ## Enterprise
  $99/month
  - Everything in Pro
  - 24/7 Support
}
```

### Testimonial Component (NEW in v0.4.0)

```centaur
@component Reviews
@type testimonial
@theme dark

{
  > "Amazing product! Changed our workflow completely."
  - Sarah Johnson, Lead Developer at TechCorp
  
  > "Best tool we've ever used."
  - Michael Chen, Designer
}
```

### Modal Component

```centaur
@component ConfirmDelete
@type modal
@theme dark
@size medium

{
  Create a confirmation modal with
  title "Are you sure?"
  content "This action cannot be undone."
  confirm button "Delete"
  cancel button "Cancel"
}
```

### Table Component

```centaur
@component UserTable
@type table
@theme dark
@columns ID, Name, Email, Status

{
  Create a searchable data table
  with striped rows
  hover effects
}
```

### Gallery Component

```centaur
@component Portfolio
@type gallery
@theme dark

{
  Create a 3-column image gallery
  with lightbox support
  - Project Alpha
  - Project Beta
  - Project Gamma
}
```

### Footer Component

```centaur
@component SiteFooter
@type footer
@theme dark

{
  Create a footer with
  copyright "© 2025 CENTAUR"
  social links: github, twitter
  
  ## Company
  - About
  - Team
}
```

---

## 🎯 Tailwind CSS Support

Generate Tailwind classes instead of vanilla CSS:

```centaur
@component MyComponent
@type form
@style tailwind

{
  ...
}
```

---

## 🤝 Human+AI Code Protocol (HACP)

Every component includes attribution:

```javascript
/**
 * Human+AI Code Protocol (HACP)
 * ─────────────────────────────
 * Human Partner: Chris Conen
 * AI Partner: Claude (Anthropic)
 * Partnership: CENTAUR
 */
```

This ensures transparent attribution in Human+AI collaborative code.

---

## 📁 Project Structure

```
centaur-lang/
├── compiler.js              # Main compiler (v0.4.0 - 3295 lines)
├── demo.html                # Interactive demo
├── README.md                # Documentation
├── SPECIFICATION.md         # Language specification
├── CONTRIBUTING.md          # Contribution guidelines
├── RELEASE_NOTES.md         # Version history
├── LICENSE                  # MIT License
└── examples/
    ├── form.centaur
    ├── hero.centaur
    ├── card.centaur
    ├── navigation.centaur
    ├── modal.centaur
    ├── table.centaur
    ├── footer.centaur
    ├── gallery.centaur
    ├── accordion.centaur     # NEW in v0.4.0
    ├── tabs.centaur          # NEW in v0.4.0
    ├── carousel.centaur      # NEW in v0.4.0
    ├── pricing.centaur       # NEW in v0.4.0
    ├── testimonial.centaur   # NEW in v0.4.0
    └── tailwind-form.centaur
```

---

## 🔮 Roadmap

| Version | Features | Status |
|---------|----------|--------|
| v0.1.0 | Form component | ✅ Released |
| v0.2.0 | Hero, Card, Navigation | ✅ Released |
| v0.3.0 | Modal, Table, Footer, Gallery, Tailwind | ✅ Released |
| v0.4.0 | Accordion, Tabs, Carousel, Pricing, Testimonial | ✅ Released |
| v0.5.0 | React/Vue output targets | 🔜 Planned |
| v1.0.0 | Full framework support, CLI | 🔜 Planned |

---

## 📊 Stats

| Metric | Value |
|--------|-------|
| **Components** | 13 |
| **Lines of Code** | 3,295 |
| **Themes** | Dark, Light |
| **CSS Frameworks** | Vanilla, Tailwind |
| **License** | MIT |

---

## 🔗 Links

- **Website**: [centaur-lang.dev](https://centaur-lang.dev)
- **GitHub**: [github.com/Centaur-Lang/centaur-lang](https://github.com/Centaur-Lang/centaur-lang)
- **Manifesto**: [centaur.australianweb.agency](https://centaur.australianweb.agency)
- **YouTube**: [CENTAUR Introduction](https://youtu.be/BcyD2Q4g8q0)

---

## 👥 Credits

**CENTAUR** — The World's First Human+AI Creative Partnership

| Role | Name |
|------|------|
| Human Partner | Chris Conen |
| AI Partner | Claude (Anthropic) |
| Agencies | Australian Web Agency, PIXELLA, Conen Digital |

---

## 📄 License

MIT License — See [LICENSE](LICENSE) file.

---

<p align="center">
  🐴 <strong>CENTAUR LANG v0.4.0</strong><br>
  <strong>13 Components</strong> | <strong>3,295 Lines</strong> | <strong>Human+AI</strong><br><br>
  <em>"Neither human alone, nor AI alone — but something greater together."</em>
</p>
