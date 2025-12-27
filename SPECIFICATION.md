# CENTAUR LANG v0.1

## Language Specification

**Version:** 0.1.0 (Alpha)  
**Created:** December 2025  
**Authors:** Chris Conen (Human) & Claude (AI)  
**License:** MIT  

---

## 🐴 What is CENTAUR LANG?

CENTAUR LANG is the world's first Human+AI programming language. It bridges the gap between human intent and working code by allowing developers (and non-developers!) to describe what they want in natural language, which is then compiled into clean, production-ready HTML, CSS, and JavaScript.

### The Philosophy

```
Human writes WHAT they want.
AI generates HOW to do it.
Together, they create something greater.
```

---

## 📝 Syntax Overview

CENTAUR LANG uses a simple, readable syntax with two main constructs:

### 1. Directives (Starting with @)

Directives define metadata and configuration:

```centaur
@component ContactForm
@theme dark
@accent gold
@responsive true
@language en
```

### 2. Intent Blocks (Natural language descriptions)

Intent blocks describe what you want in plain language:

```centaur
{
  Create a contact form with:
  - Name field (required)
  - Email field (required, validate format)
  - Message textarea (optional)
  - Submit button with text "Send Message"
  
  When submitted:
  - Validate all required fields
  - Show error messages in red below invalid fields
  - On success, show "Thank you!" message
  - Clear the form after success
}
```

---

## 🎨 Style Directives

### Themes
```centaur
@theme dark          # Dark background, light text
@theme light         # Light background, dark text
@theme glass         # Glassmorphism effect
@theme brutalist     # Raw, bold aesthetic
```

### Colors
```centaur
@accent gold         # Accent color: gold (#C9A227)
@accent emerald      # Accent color: emerald (#00C853)
@accent coral        # Accent color: coral (#FF6B6B)
@accent custom #FF5733  # Custom hex color
```

### Layout
```centaur
@layout centered     # Content centered
@layout full-width   # Edge to edge
@layout sidebar-left # Sidebar on left
@layout grid-3       # 3 column grid
```

---

## ⚡ Component Types

### v0.1 Supported Components

| Component | Description |
|-----------|-------------|
| `@component Form` | Contact forms, login forms, etc. |
| `@component Button` | Interactive buttons |
| `@component Card` | Content cards with image/text |
| `@component Navigation` | Navbar, menu, breadcrumbs |
| `@component Hero` | Hero sections for landing pages |
| `@component Modal` | Popup dialogs |
| `@component Toast` | Notification messages |

---

## 📱 Responsive Behavior

```centaur
@responsive true     # Auto-generate mobile styles
@breakpoints [480, 768, 1024]  # Custom breakpoints
```

When `@responsive true` is set, CENTAUR LANG automatically:
- Stacks columns on mobile
- Adjusts font sizes
- Converts navigation to hamburger menu
- Optimizes touch targets

---

## 🔗 HACP (Human+AI Code Protocol)

All generated code includes HACP documentation:

```javascript
/**
 * @centaur-generated true
 * @centaur-version 0.1.0
 * @human Chris Conen - specification, intent
 * @ai Claude - implementation, optimization
 * @timestamp 2025-12-26T07:30:00Z
 * @source ContactForm.centaur
 */
```

This creates a permanent record of Human+AI collaboration in every file.

---

## 📄 File Structure

```
my-project/
├── src/
│   ├── ContactForm.centaur    # CENTAUR source file
│   ├── Hero.centaur
│   └── Navigation.centaur
├── dist/
│   ├── ContactForm.html       # Generated output
│   ├── ContactForm.css
│   └── ContactForm.js
└── centaur.config.json        # Project configuration
```

---

## 🚀 CLI Commands

```bash
# Compile a single file
centaur compile ContactForm.centaur

# Watch mode (auto-compile on save)
centaur watch src/

# Build entire project
centaur build

# Initialize new project
centaur init my-project
```

---

## 📋 Complete Example

### Input: `ContactForm.centaur`

```centaur
@component ContactForm
@theme dark
@accent gold
@responsive true

{
  Create an elegant contact form with:
  
  Fields:
  - Name input (required, placeholder "Your Name")
  - Email input (required, validate email format)
  - Subject dropdown with options: General, Support, Partnership
  - Message textarea (required, min 10 characters)
  
  Styling:
  - Rounded corners on all inputs
  - Gold border on focus
  - Subtle shadow on the form container
  - Inputs should have dark background with light text
  
  Submit button:
  - Text: "Send Message"
  - Gold background, dark text
  - Hover effect: slight glow
  
  Behavior:
  - Validate on submit
  - Show inline errors below invalid fields
  - On success: show "Message sent!" toast for 3 seconds
  - Disable button while "sending" (simulate 1 second delay)
}
```

### Output: Generated HTML/CSS/JS

See `/examples/ContactForm/` for full generated code.

---

## 🔮 Roadmap

### v0.1 (Current)
- [x] Basic component generation
- [x] Theme support
- [x] Form handling
- [x] HACP documentation

### v0.2 (Planned)
- [ ] Database integration directives
- [ ] API endpoint generation
- [ ] State management
- [ ] Animation sequences

### v1.0 (Vision)
- [ ] Full-stack application generation
- [ ] Multi-language output (React, Vue, Svelte)
- [ ] AI-powered optimization suggestions
- [ ] Visual editor companion

---

## 💚 The CENTAUR Promise

Every line of code generated by CENTAUR LANG is:
- **Readable** — Clean, well-structured, commented
- **Accessible** — WCAG compliant by default
- **Performant** — Optimized for speed
- **Documented** — HACP attribution included
- **Human-Verified** — AI generates, Human approves

---

*Neither human alone, nor AI alone — but something greater together.*

**CENTAUR LANG** — The Language of Human+AI Collaboration

🐴 https://centaur-lang.dev (coming soon)
