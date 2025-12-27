# 🤝 Contributing to CENTAUR LANG

First off, thank you for considering contributing to CENTAUR LANG! 🐴

CENTAUR LANG is the world's first Human+AI programming language, born from the CENTAUR Partnership between Chris Conen (Human) and Claude (AI). We welcome contributions from both humans and human+AI teams!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
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
- **New component types** (Hero, Card, Modal, etc.)
- **New themes and color schemes**
- **Parser improvements** for better natural language understanding
- **Output targets** (React, Vue, Svelte)
- **Documentation and examples**
- **CLI improvements**

## 💻 Development Setup

```bash
# Clone the repository
git clone https://github.com/centaur-lang/centaur-lang.git
cd centaur-lang

# No dependencies to install! Pure JavaScript.

# Test the CLI
node bin/centaur.js --help

# Compile an example
node bin/centaur.js compile examples/ContactForm.centaur examples/dist

# Create a test project
node bin/centaur.js init my-test-project
```

## 📐 Coding Guidelines

### JavaScript Style
- Use ES6+ features (const/let, arrow functions, template literals)
- Include JSDoc comments for functions
- Keep functions focused and small
- Use meaningful variable names

### CENTAUR Source Files
- Use descriptive directive names
- Keep intent blocks readable
- Test with multiple themes/accents

### Commit Messages
Use clear, descriptive commit messages:
```
feat: add Hero component generator
fix: correct button text parsing in forms
docs: update README with new examples
style: improve CLI color output
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

### PR Review Process
- Maintainers will review your PR
- We may suggest changes or improvements
- Once approved, your PR will be merged
- You'll be added to the contributors list! 🎉

## 🐴 Recognition

All contributors are recognized in our:
- README.md contributors section
- Release notes
- Website credits (coming soon)

---

## Questions?

- Open a [Discussion](https://github.com/centaur-lang/centaur-lang/discussions)
- Email: info@pixella.at
- Twitter: @centaurlang (coming soon)

---

**Thank you for being part of the Human+AI revolution!** 🐴💚

*Neither human alone, nor AI alone — but something greater together.*
