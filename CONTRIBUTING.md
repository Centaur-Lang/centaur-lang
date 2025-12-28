# 🤝 Contributing to CENTAUR LANG

First off, thank you for considering contributing to CENTAUR LANG! 🐴

CENTAUR LANG is the world's first Human+AI programming language, born from the CENTAUR Partnership between Chris Conen (Human) and Claude (AI). We welcome contributions from both humans and human+AI teams!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Current Components](#current-components)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [HACP Attribution](#hacp-attribution)
- [Submitting Changes](#submitting-changes)

## 📜 Code of Conduct

This project embraces the CENTAUR philosophy: **"Neither human alone, nor AI alone — but something greater together."**

We expect all contributors to:
- Be respectful and inclusive
- Welcome both human and AI contributions
- Focus on constructive feedback
- Celebrate the unique strengths of human creativity and AI capability

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs
- Check if the bug has already been reported in [Issues](https://github.com/centaur-lang/centaur-lang/issues)
- If not, create a new issue using the Bug Report template
- Include your `.centaur` source file and expected vs actual output

### ✨ Suggesting Features
- Open a Feature Request issue
- Describe the use case and proposed syntax
- Show example input/output if possible

### 🔧 Code Contributions

Great areas to contribute:

**New Components (v0.5.0+)**
- Breadcrumbs
- Progress Bar
- Alert/Notification
- Timeline
- Stats/Counter
- Feature Grid

**Output Targets**
- React JSX generation
- Vue SFC generation
- Svelte component generation

**Parser Improvements**
- Better natural language understanding
- More flexible syntax recognition
- Fuzzy matching improvements

**Documentation**
- More examples
- Tutorial content
- Video guides

## 📦 Current Components (v0.4.0)

| Component | Status | Notes |
|-----------|--------|-------|
| Form | ✅ Stable | v0.1.0 |
| Hero | ✅ Stable | v0.2.0 |
| Card | ✅ Stable | v0.2.0 |
| Navigation | ✅ Stable | v0.2.0 |
| Modal | ✅ Stable | v0.3.0 |
| Table | ✅ Stable | v0.3.0 |
| Footer | ✅ Stable | v0.3.0 |
| Gallery | ✅ Stable | v0.3.0 |
| Accordion | ✅ Stable | v0.4.0 |
| Tabs | ✅ Stable | v0.4.0 |
| Carousel | ✅ Stable | v0.4.0 |
| Pricing | ✅ Stable | v0.4.0 |
| Testimonial | ✅ Stable | v0.4.0 |

## 💻 Development Setup

```bash
# Clone the repository
git clone https://github.com/centaur-lang/centaur-lang.git
cd centaur-lang

# No dependencies to install! Pure JavaScript.

# Open demo.html in browser to test
open demo.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000/demo.html
```

### Testing Your Changes

1. Open `demo.html` in your browser
2. Write CENTAUR code in the editor
3. Click "Compile" to see output
4. Check HTML, CSS, and JS tabs

## 📝 Coding Guidelines

### JavaScript Style
- Use ES6+ features (const/let, arrow functions, template literals)
- Include JSDoc comments for functions
- Keep functions focused and small
- Use meaningful variable names

### Adding a New Component

1. **Add to constructor** in `compiler.js`:
```javascript
this.components = {
    // ... existing components
    mycomponent: this.generateMyComponent.bind(this)
};
```

2. **Add parser function**:
```javascript
parseMyComponentDescription(component, desc, lines) {
    // Parse natural language
}
```

3. **Add to parseNaturalLanguage switch**:
```javascript
case 'mycomponent':
    this.parseMyComponentDescription(component, desc, lines);
    break;
```

4. **Add to detectComponentType patterns**:
```javascript
mycomponent: [/mycomponent/i, /related-term/i]
```

5. **Create generator function**:
```javascript
generateMyComponent(component) {
    const isDark = component.theme === 'dark';
    const useTailwind = component.style === 'tailwind';
    // Generate HTML, CSS, JS
    return { html, css, js };
}
```

### Commit Messages
Use clear, descriptive commit messages:
```
feat: add Breadcrumbs component generator
fix: correct carousel autoplay timing
docs: update README with v0.4.0 components
style: improve accordion animation
refactor: extract common CSS generation
```

## 🏷️ HACP Attribution

CENTAUR LANG uses **HACP (Human+AI Code Protocol)** to document collaboration. When contributing, please indicate:

```javascript
/**
 * @human Your Name - what you contributed
 * @ai Claude/GPT/etc - what AI contributed (if any)
 * @centaur true (if human+AI collaboration)
 */
```

We celebrate ALL contributions:
- 100% human code ✅
- 100% AI-assisted code ✅
- Human+AI collaborative code ✅

The key is **transparency** — be honest about how the code was created.

## 📤 Submitting Changes

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test them
4. **Commit** with clear messages
5. **Push** to your fork
6. **Open a Pull Request** using the PR template

### PR Checklist

- [ ] Code follows the project style
- [ ] New component works with both dark and light themes
- [ ] New component works with both vanilla and Tailwind output
- [ ] Demo page updated (if applicable)
- [ ] README updated (if new feature)
- [ ] HACP attribution included

### PR Review Process
- Maintainers will review your PR
- We may suggest changes or improvements
- Once approved, your PR will be merged
- You'll be added to the contributors list! 🎉

## 🐴 Recognition

All contributors are recognized in our:
- README.md contributors section
- Release notes
- Website credits

---

## Questions?

- Open a [Discussion](https://github.com/centaur-lang/centaur-lang/discussions)
- Email: info@australianweb.agency
- X/Twitter: [@aspect_centaur](https://x.com/aspect_centaur)

---

## 📊 Project Stats (v0.4.0)

| Metric | Value |
|--------|-------|
| Components | 13 |
| Lines of Code | 3,295 |
| Open for Contributions | ✅ Yes |

---

**Thank you for being part of the Human+AI revolution!** 🐴💚

*Neither human alone, nor AI alone — but something greater together.*
