# 🐴 CENTAUR LANG

> **The World's First Human+AI Programming Language**

[![Version](https://img.shields.io/badge/version-0.3.0-blue.svg)](https://github.com/Centaur-Lang/centaur-lang)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HACP](https://img.shields.io/badge/HACP-Human%2BAI-gold.svg)](https://centaur.australianweb.agency)

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

## 📦 Components (v0.3.0)

| Component | Description | Since |
|-----------|-------------|-------|
| **Form** | Contact forms, login forms, any input form | v0.1.0 |
| **Hero** | Landing page hero sections with CTA | v0.2.0 |
| **Card** | Content cards with images and buttons | v0.2.0 |
| **Navigation** | Responsive navbar with mobile menu | v0.2.0 |
| **Modal** | Popup dialogs with confirm/cancel | v0.3.0 🆕 |
| **Table** | Data tables with search & hover | v0.3.0 🆕 |
| **Footer** | Multi-column footers with social links | v0.3.0 🆕 |
| **Gallery** | Image galleries with lightbox | v0.3.0 🆕 |

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
@style tailwind    <!-- NEW in v0.3.0 -->

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
├── compiler.js          # Main compiler (v0.3.0)
├── demo.html            # Interactive demo
├── README.md            # Documentation
├── RELEASE_NOTES.md     # Version history
├── LICENSE              # MIT License
└── examples/
    ├── form.centaur
    ├── hero.centaur
    ├── card.centaur
    ├── navigation.centaur
    ├── modal.centaur        # NEW
    ├── table.centaur        # NEW
    ├── footer.centaur       # NEW
    ├── gallery.centaur      # NEW
    └── tailwind-form.centaur # NEW
```

---

## 🔮 Roadmap

| Version | Features | Status |
|---------|----------|--------|
| v0.1.0 | Form component | ✅ Released |
| v0.2.0 | Hero, Card, Navigation | ✅ Released |
| v0.3.0 | Modal, Table, Footer, Gallery, Tailwind | ✅ Released |
| v0.4.0 | Accordion, Tabs, Carousel | 🔜 Planned |
| v0.5.0 | React/Vue output | 🔜 Planned |
| v1.0.0 | Full framework support, CLI | 🔜 Planned |

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
  🐴 <strong>CENTAUR LANG</strong><br>
  <em>"Neither human alone, nor AI alone — but something greater together."</em>
</p>
