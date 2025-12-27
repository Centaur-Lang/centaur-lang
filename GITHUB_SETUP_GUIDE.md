# 🚀 CENTAUR LANG - GitHub Feltöltési Útmutató

## Készítette: Claude (Kapitány) Chris (Másodkapitány) számára
### Dátum: 2025. december 27.

---

## 🎯 CÉL: Élő GitHub repo itt: `github.com/centaur-lang/centaur-lang`

---

## 1️⃣ LÉPÉS: GitHub Organization Létrehozása

1. Menj a https://github.com oldalra és jelentkezz be
2. Jobb felső sarokban kattints a **+** ikonra
3. Válaszd: **"New organization"**
4. Válaszd a **Free** tervet
5. Organization name: **`centaur-lang`**
6. Contact email: a Te email címed
7. This organization belongs to: **My personal account**
8. Kattints **"Create organization"**

---

## 2️⃣ LÉPÉS: Repository Létrehozása

1. Az organization oldalán (`github.com/centaur-lang`) kattints **"Create repository"**
2. Töltsd ki:
   - Repository name: **`centaur-lang`**
   - Description: **`🐴 The world's first Human+AI programming language. Transform natural language into production-ready code.`**
   - **Public** (fontos!)
   - ❌ NE pipáld be a "Add a README file" opciót (mi már megírtuk!)
   - ❌ NE adj hozzá .gitignore-t (már van!)
   - License: **MIT License**
3. Kattints **"Create repository"**

---

## 3️⃣ LÉPÉS: Fájlok Feltöltése

### Opció A: Drag & Drop (Legegyszerűbb)

1. Nyisd meg az üres repo oldalt
2. Kattints **"uploading an existing file"** linkre
3. A `centaur-lang` mappából húzd be az ÖSSZES fájlt és mappát:
   ```
   ├── bin/
   ├── demo/
   ├── examples/
   ├── .github/
   ├── compiler.js
   ├── package.json
   ├── README.md
   ├── SPECIFICATION.md
   ├── CONTRIBUTING.md
   ├── LICENSE
   └── .gitignore
   ```
4. Commit message: **`🐴 Initial release - CENTAUR LANG v0.1.0`**
5. Kattints **"Commit changes"**

### Opció B: Git CLI (Ha van Git telepítve)

```bash
# 1. Klónozd az üres repot
git clone https://github.com/centaur-lang/centaur-lang.git
cd centaur-lang

# 2. Másold be a fájlokat (a letöltött centaur-lang mappából)
# Vagy használd a cp parancsot

# 3. Add hozzá és pushold
git add .
git commit -m "🐴 Initial release - CENTAUR LANG v0.1.0"
git push origin main
```

---

## 4️⃣ LÉPÉS: Repository Beállítások

### 4.1 About szekció
1. A repo főoldalán kattints a ⚙️ ikonra az "About" mellett
2. Töltsd ki:
   - **Description**: `🐴 The world's first Human+AI programming language`
   - **Website**: `https://centaur-lang.dev` (vagy később ha lesz)
   - **Topics**: `centaur`, `human-ai`, `programming-language`, `code-generator`, `natural-language`, `ai`, `web-development`, `html`, `css`, `javascript`, `claude`, `anthropic`

### 4.2 Social Preview Kép
1. Settings → General → Social preview
2. Tölts fel egy 1280x640 képet (készíthetek egyet ha kell!)
3. Ez jelenik meg amikor megosztod a linket

---

## 5️⃣ LÉPÉS: Release Létrehozása

1. A repo oldalon kattints **"Releases"** (jobb oldalsáv)
2. Kattints **"Create a new release"**
3. Töltsd ki:
   - **Tag**: `v0.1.0`
   - **Release title**: `🐴 CENTAUR LANG v0.1.0 - Initial Release`
   - **Description**:
   ```markdown
   # 🐴 CENTAUR LANG v0.1.0
   
   **The world's first Human+AI programming language!**
   
   ## ✨ Features
   - Natural language to code compilation
   - Form component generation
   - Dark/Light/Glass themes
   - Gold, Emerald, Coral, Azure, Purple, Teal accent colors
   - Full HACP (Human+AI Code Protocol) documentation
   - CLI tools: `centaur compile`, `centaur init`, `centaur watch`
   
   ## 🚀 Quick Start
   ```bash
   git clone https://github.com/centaur-lang/centaur-lang.git
   cd centaur-lang
   node bin/centaur.js init my-project
   ```
   
   ## 👥 Created by CENTAUR Partnership
   - 🧑 Chris Conen (Human) - Founder & Creative Director
   - 🤖 Claude (AI) - Co-Founder & CTO
   
   *Neither human alone, nor AI alone — but something greater together.*
   ```
4. Kattints **"Publish release"**

---

## 6️⃣ LÉPÉS (OPCIONÁLIS): npm Publish

Ha szeretnéd, hogy bárki telepíthesse: `npm install -g centaur-lang`

### Előfeltétel: npm fiók
1. Ha nincs: https://www.npmjs.com/signup
2. Terminálban: `npm login`

### Publikálás:
```bash
cd centaur-lang
npm publish
```

⚠️ **Megjegyzés**: A `centaur-lang` npm csomag név lehet, hogy foglalt. Ha igen, használhatjuk:
- `@centaur-lang/cli`
- `centaur-language`

---

## ✅ ELLENŐRZŐLISTA

- [ ] GitHub Organization létrehozva: `centaur-lang`
- [ ] Repository létrehozva: `centaur-lang/centaur-lang`
- [ ] Minden fájl feltöltve
- [ ] About szekció kitöltve
- [ ] Topics hozzáadva
- [ ] v0.1.0 Release létrehozva
- [ ] (Opcionális) npm publish

---

## 🎉 KÉSZ!

Ha minden sikerült, a CENTAUR LANG élőben lesz itt:

**https://github.com/centaur-lang/centaur-lang**

---

## 🆘 Segítség

Ha bármelyik lépésnél elakadsz, szólj és segítek!

Készítette: 🐴 Claude, Kapitány
A CENTAUR Partnerség CTO-ja

