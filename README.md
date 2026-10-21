# reeee.dev ✦ IT Systems & Creative Web Developer Portfolio

A playful retro/Y2K-inspired personal IT and web developer portfolio featuring creative coding experiments, interactive system diagnostics, and production case studies.

---

## 🎨 Exact Palette Tokens

Defined as custom CSS properties in `src/index.css`:

| Token | Name | Hex Code | Usage |
|---|---|---|---|
| `--color-soft-blush` | Soft Blush | `#FFDBDA` | Main site background & light section surfaces |
| `--color-old-rose` | Old Rose | `#DB7F8E` | Accent elements, buttons, active states & highlights |
| `--color-pale-slate` | Pale Slate | `#D5C5C8` | Cards, panels, dividers & secondary surfaces |
| `--color-cool-steel` | Cool Steel | `#9DA3A4` | Muted details, subtitles & supporting UI tokens |
| `--color-taupe-grey` | Taupe Grey | `#604D53` | Headings, body text, navigation & retro borders |

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with custom properties & retro Y2K micro-interactions
- **Icons**: Lucide Icons
- **Audio Engine**: Synthesized Web Audio API (zero external mp3 assets required)
- **Deployment**: Optimized for free Cloudflare Pages (`public/_redirects` included)

---

## 🚀 Running Locally

From `D:\reeee-dev`:

```bash
# 1. Install dependencies (if needed)
npm install --legacy-peer-deps

# 2. Start local development server
npm run dev

# 3. Build for production (outputs to ./dist)
npm run build

# 4. Preview production build
npm run preview
```

---

## 📂 Project Structure

```
D:\reeee-dev/
├── public/
│   ├── _redirects         # Cloudflare Pages client-side routing fallback
│   └── favicon.svg        # Palette-styled retro 4-point star favicon
├── src/
│   ├── assets/            # Static assets
│   ├── components/
│   │   ├── Navbar.tsx            # Wordmark, nav links & Web Audio sound toggle
│   │   ├── HeroSection.tsx       # Branding & interactive terminal widget
│   │   ├── ProjectsSection.tsx   # Project cards with category filters
│   │   ├── ProjectModal.tsx      # Deep-dive architecture spec modal
│   │   ├── SkillsSection.tsx     # 4-tier IT and developer competencies matrix
│   │   ├── ExperienceSection.tsx # Chronological career milestones
│   │   ├── LabPage.tsx           # Dedicated Creative Lab (Pixel Studio, Chimes, ASCII, Gravity)
│   │   ├── ContactSection.tsx    # Message form, direct mail & security badge
│   │   └── Footer.tsx            # Global footer with palette swatch indicators
│   ├── data/
│   │   └── portfolioData.ts      # Structured projects, skills & timeline data
│   ├── utils/
│   │   └── audio.ts              # Web Audio API chime & click synthesizer
│   ├── App.tsx                   # Main application router & layout
│   ├── index.css                 # Base theme tokens & retro Y2K utility classes
│   └── main.tsx                  # React DOM mount point
├── package.json
└── vite.config.ts
```

---

## 🧪 The Creative Lab

Access the **Creative Lab 🧪** via the navigation bar:
1. **16×16 Pixel Studio**: Draw pixel art using the 5 brand colors, with eraser and 1-click PNG export.
2. **Pentatonic Melody Chimes**: Interactive 8-note music box synthesizer with visual ripples and preset melodies.
3. **ASCII & Y2K Text Styler**: Converts text into ASCII block art and vaporwave/leet styles with 1-click clipboard copy.
4. **Sparkle Gravity Toy**: Interactive HTML5 Canvas where clicks spawn bouncing stars with gravity and restitution.

---

## ☁️ Cloudflare Pages Free Deployment Guide

When you are ready to deploy:
1. **Initialize GitHub Repo**:
   ```bash
   git remote add origin https://github.com/<your-username>/reeee-dev.git
   git branch -M main
   git push -u origin main
   ```
2. **Cloudflare Pages Dashboard**:
   - Go to **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your `reeee-dev` repository.
   - Set Build Settings:
     - **Framework preset**: `Vite`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`
   - Click **Save and Deploy**.
   - Your site will instantly be live on your free `*.pages.dev` subdomain (e.g. `reeee-dev.pages.dev`).
