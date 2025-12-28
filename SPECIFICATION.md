# CENTAUR LANG Specification

## Language Specification

**Version:** 0.4.0  
**Created:** December 2025  
**Updated:** December 28, 2025  
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
@type form
@theme dark
@style vanilla
@size medium
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
}
```

---

## 🎨 Core Directives

### @component
Defines the component name:
```centaur
@component MyComponent
@component ContactForm
@component UserDashboard
```

### @type
Specifies the component type (13 types available in v0.4.0):
```centaur
@type form
@type hero
@type card
@type navigation
@type modal
@type table
@type footer
@type gallery
@type accordion      # NEW in v0.4.0
@type tabs           # NEW in v0.4.0
@type carousel       # NEW in v0.4.0
@type pricing        # NEW in v0.4.0
@type testimonial    # NEW in v0.4.0
```

### @theme
Sets the color theme:
```centaur
@theme dark          # Dark background, light text
@theme light         # Light background, dark text
```

### @style
Chooses CSS output format:
```centaur
@style vanilla       # Standard CSS (default)
@style tailwind      # Tailwind CSS classes
```

---

## ⚡ Component Types (v0.4.0)

### 13 Production-Ready Components

| Component | Type Aliases | Description |
|-----------|--------------|-------------|
| **Form** | `form` | Contact forms, login forms, surveys |
| **Hero** | `hero`, `banner` | Landing page hero sections |
| **Card** | `card`, `box`, `tile` | Content cards with media |
| **Navigation** | `navigation`, `nav`, `navbar` | Responsive navigation |
| **Modal** | `modal`, `popup`, `dialog` | Popup dialogs |
| **Table** | `table` | Data tables with search |
| **Footer** | `footer` | Multi-column footers |
| **Gallery** | `gallery` | Image galleries |
| **Accordion** | `accordion`, `faq`, `collapsible` | Collapsible sections |
| **Tabs** | `tabs`, `tabbed` | Tabbed interfaces |
| **Carousel** | `carousel`, `slider`, `slideshow` | Image sliders |
| **Pricing** | `pricing`, `plans`, `packages` | Pricing tables |
| **Testimonial** | `testimonial`, `reviews`, `quotes` | Customer reviews |

---

## 📋 Component-Specific Directives

### Modal
```centaur
@size small          # 350px max-width
@size medium         # 500px max-width (default)
@size large          # 700px max-width
@trigger "Open"      # Trigger button text
```

### Table
```centaur
@columns ID, Name, Email, Status    # Column headers
```

### Carousel
```centaur
# Autoplay parsed from description
{
  Create a slider with autoplay 5 seconds
}
```

---

## 📝 Natural Language Parsing

CENTAUR LANG understands natural language descriptions:

### Form Fields
```
"name field" → text input for name
"email field" → email input with validation
"password field" → password input
"message textarea" → multiline text input
"phone field" → telephone input
"date field" → date picker
```

### Modal Options
```
"title 'My Title'" → modal header
"content 'My content'" → modal body
"confirm button 'Yes'" → confirmation button
"cancel button 'No'" → cancel button
```

### Pricing Features
```
"$29/month" → price with period
"popular" or "recommended" → highlighted plan
"- Feature name" → feature list item
```

### Testimonials
```
> "Quote text here"      → testimonial quote
- Author Name, Role      → author attribution
```

### Accordion/Tabs
```
## Section Title         → section/tab header
Content below...         → section/tab content
```

---

## 🔗 HACP (Human+AI Code Protocol)

All generated code includes HACP documentation:

```javascript
/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  Human+AI Code Protocol (HACP)                                ║
 * ║  Human Partner: Chris Conen                                   ║
 * ║  AI Partner: Claude (Anthropic)                               ║
 * ║  Partnership: CENTAUR                                         ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */
```

This creates a permanent record of Human+AI collaboration in every file.

---

## 📁 File Structure

```
my-project/
├── src/
│   ├── ContactForm.centaur
│   ├── Hero.centaur
│   └── Navigation.centaur
├── dist/
│   ├── ContactForm.html
│   ├── ContactForm.css
│   └── ContactForm.js
└── centaur.config.json
```

---

## 📋 Complete Examples

### Accordion Example

```centaur
@component FAQ
@type accordion
@theme dark

{
  ## What is CENTAUR LANG?
  CENTAUR LANG is the world's first Human+AI programming language,
  created by Chris Conen and Claude AI.
  
  ## How does it work?
  Write natural language descriptions, and CENTAUR compiles them
  into production-ready HTML, CSS, and JavaScript.
  
  ## Is it open source?
  Yes! CENTAUR LANG is MIT licensed and free to use.
}
```

### Tabs Example

```centaur
@component ProductTabs
@type tabs
@theme dark

{
  ## Overview
  Our product helps you build websites faster with AI assistance.
  
  ## Features
  - Natural language input
  - 13 component types
  - Dark and light themes
  - Tailwind support
  
  ## Pricing
  Free and open source under MIT license.
}
```

### Carousel Example

```centaur
@component HeroSlider
@type carousel
@theme dark

{
  Create an image carousel with
  autoplay 5 seconds
  show dots
  show arrows
  
  - Welcome to CENTAUR
  - Human + AI Partnership
  - Build Faster Together
}
```

### Pricing Example

```centaur
@component PricingPlans
@type pricing
@theme dark

{
  ## Starter
  $9/month
  - 5 Projects
  - Basic Support
  - 1GB Storage
  button "Start Free"
  
  ## Professional
  $29/month
  popular
  - Unlimited Projects
  - Priority Support
  - 10GB Storage
  - Analytics
  button "Get Started"
  
  ## Enterprise
  $99/month
  - Everything in Pro
  - 24/7 Support
  - Unlimited Storage
  - API Access
  button "Contact Sales"
}
```

### Testimonial Example

```centaur
@component CustomerReviews
@type testimonial
@theme dark

{
  > "CENTAUR LANG transformed how we build web components!"
  - Sarah Johnson, Lead Developer at TechCorp
  
  > "The natural language approach is a game changer."
  - Michael Chen, Design Director
  
  > "Finally, human creativity meets AI capability."
  - Emma Williams, Freelance Designer
}
```

---

## 🔮 Roadmap

### v0.1.0 ✅
- [x] Form component
- [x] Basic theme support
- [x] HACP documentation

### v0.2.0 ✅
- [x] Hero component
- [x] Card component
- [x] Navigation component

### v0.3.0 ✅
- [x] Modal component
- [x] Table component
- [x] Footer component
- [x] Gallery component
- [x] Tailwind CSS support

### v0.4.0 ✅ (Current)
- [x] Accordion component
- [x] Tabs component
- [x] Carousel component
- [x] Pricing component
- [x] Testimonial component
- [x] Enhanced NL parsing

### v0.5.0 (Planned)
- [ ] React output target
- [ ] Vue output target
- [ ] Svelte output target

### v1.0.0 (Vision)
- [ ] Full-stack generation
- [ ] CLI tool
- [ ] VS Code extension
- [ ] AI-powered optimization

---

## 💚 The CENTAUR Promise

Every line of code generated by CENTAUR LANG is:
- **Readable** — Clean, well-structured, commented
- **Accessible** — WCAG compliant by default
- **Performant** — Optimized for speed
- **Documented** — HACP attribution included
- **Human-Verified** — AI generates, Human approves

---

## 📊 v0.4.0 Stats

| Metric | Value |
|--------|-------|
| Components | 13 |
| Lines of Code | 3,295 |
| Themes | 2 (Dark, Light) |
| CSS Outputs | 2 (Vanilla, Tailwind) |

---

*Neither human alone, nor AI alone — but something greater together.*

**CENTAUR LANG** — The Language of Human+AI Collaboration

🐴 https://centaur-lang.dev
