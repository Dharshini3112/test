# Identity SDK — Test Console — Documentation

**Deployed URL:** `https://test-mu-ten-20.vercel.app`
**Tracking:** Reignat (`https://reignat.com/tracker.js`) — Site ID `80439c59-7400-411d-ae93-c7446d217403`

---

## Overview

This is a **FingerprintJS Identity SDK** test console deployed on Vercel. It provides a UI for testing visitor identification, authentication flows, font fingerprinting, and canvas-based device detection.

All pages include the Reignat tracking script inside the `<head>` tag for visitor analytics, viewable at the [Reignat Dashboard](https://reignat.com).

---

## Pages & Features

### 1. Home — `index.html`
**Title:** Identity SDK — Test Console

- SDK initialization status
- **Authentication section:**
  - Login (Email + Password)
  - Sign Up (Name + Email + Password)
- **Identity Data panel:**
  - `site_code`, `anon_id`, `visitor_id`, `session_id`, `matched_via`, `is_new`, `confidence`, `bot_score`
- **Actions:**
  - 🔑 Resolve Identity
  - 🪪 Get Anon ID
  - 👁 Track Page View
- **Navigation:** News, API Demo, Google Maps, Products Site
- **Live Log** with clear button
- Port 8001 · ngrok · Docker

---

### 2. News — `news.html`
**Title:** Latest News

Lists tutorial cards:

| Tutorial | Description |
|----------|-------------|
| **Python for Beginners to Advanced** | Variables, loops, OOP, NumPy, Pandas, Matplotlib |
| **Java Programming — Core to OOP** | Data types, control flow, collections, exception handling |
| **Data Science with Python** | EDA, visualization, ML with scikit-learn |
| **Power BI — Data Visualization** | DAX, relationships, dashboards, Power BI Service |

Each card links to the tutorial page with a topic query param (`?topic=python`, `?topic=java`, etc.).
External link: [Products Site](https://products-site-rho.vercel.app/)

---

### 3. Tutorial — `tutorial.html`
**Title:** பயிற்சி (Tutorial) — `lang="ta"` (Tamil)

- Multi-topic tutorial page (content injected via `?topic=` query param)
- Sidebar table of contents
- Previous / Next navigation
- Advertisements (placeholder banners linking to Products Site)
- Navigation to Home, News, API Demo

---

### 4. API Demo — `api-demo.html`
**Title:** Identity SDK API Demo

- SDK Initialization status
- Identity Data panel (same fields as Home)
- **Actions:**
  - 🔑 Resolve Identity
  - 🪪 Get Anon ID
  - 👁 Track Page View
  - 📊 Track Custom Event
- Live Log
- Navigation: Home, Tutorial

---

### 5. Width Signature — `widthsignature.html`
**Title:** FPJS Advanced Width Signature Tool

- Extracts pixel-level width signatures for **52 FPJS fonts**
- **Metrics displayed:**
  - Width Signature hash
  - Detected Fonts count
  - Execution Time
  - Canvas Entropy
- **Per-font data:** FONT NAME, DOM STATUS, CANVAS MATCH, WIDTH SIGNATURE (W × H), IDENTIFIER
- **Button:** Generate Width Signature

---

### 6. Font Detection v2 — `font_detection2.html`
**Title:** Advanced Font Validation Tool v2.0

- Dual-testing with **Multiple Baselines & Unicode Entropy Comparison**
- **Three test modes:**
  - Sequential (Old) — DOM-based
  - Batch Rendering (SDK) — Optimized
  - Canvas Dual-Testing — Dual-baseline
- Tests **36 SDK fonts** with per-font results: DOM, BATCH (OPTIMIZED), CANVAS (DUAL-BASE), STATUS
- **Button:** Start Advanced Validation

---

### 7. Different Font — `differentfont.html`
**Title:** FingerprintJS (52 Fonts) Validation Tool

- Validates the full **FingerprintJS v4.0.2** font list
- **Three test modes:**
  - Sequential (Raw)
  - Batch Processed
  - Canvas Advanced
- **Per-font data:** FPJS FONT LIST (52 total), DOM RESULT, CANVAS MATCH, PROBABILITY
- **Button:** Run FPJS Integrity Test

---

### 8. Font Visualization — `font_visualization.html`
**Title:** Font Comparison Visualizer

- Educational page showing three font baseline types:
  - **Serif (Tails)** — "Ag 한국어" with serifs
  - **Sans-Serif (Clean)** — "Ag 한국어" without serifs
  - **Monospace (Equal Width)** — "Ag 한국어" fixed-width
- Explains the three baselines used by the SDK for font detection
- Lightweight educational tool (no JavaScript logic)

---

## External Links

| Site | URL |
|------|-----|
| Products Site | `https://products-site-rho.vercel.app/` |
| Google Maps | `https://www.google.com/maps` |
| Reignat Dashboard | `https://reignat.com` |

---

## Tracking Implementation

```html
<script defer src="https://reignat.com/tracker.js" data-site="80439c59-7400-411d-ae93-c7446d217403"></script>
```

Placed inside the `<head>` tag of all HTML pages. Dashboard: [https://reignat.com](https://reignat.com)
