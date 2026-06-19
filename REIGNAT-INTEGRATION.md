# Reignat Analytics — Integration Documentation

## What is Reignat?

**Reignat** (`https://reignat.com`) is a **simple, privacy-friendly web analytics platform**. It tracks website visitors, pageviews, traffic sources, devices, locations, and performance metrics — without using cookies.

### Key Features

| Feature | Details |
|---------|---------|
| Real-time analytics | Live visitors, pageviews, locations, devices, browsers |
| Visitor Intelligence | Journeys, session duration, entry/exit pages |
| Global Audience | Country, region, city breakdowns |
| Performance Monitoring | Core Web Vitals (LCP, INP, CLS), load times |
| GDPR Compliant | No cookies needed, no consent banner required |
| Cookieless Tracking | Tracks via lightweight script, not cookies |
| Funnel Analysis | Track conversion funnels |
| Visitor Profiles | Individual visitor-level data |
| Custom Events | Track custom actions |
| API Access | Programmatic data access |
| Script Size | < 1 KB (very lightweight) |
| Pricing | Starts at $9/mo for 10K events |

---

## How Reignat Works

```
Visitor Browser
      │
      ▼
Website loads → `<script>` tag fires → Reignat server
      │                                          │
      ▼                                          ▼
  Page rendered                            Reignat Dashboard
                                        (real-time analytics)
```

### Step-by-Step Flow

1. **Install Script** — Add one lightweight `<script>` tag before `</head>` on your website:
   ```html
   <script defer src="https://reignat.com/tracker.js" data-site="YOUR_SITE_ID"></script>
   ```

2. **Auto-Collection** — Reignat automatically records:
   - Page views & URLs
   - Visitor country, region, city (via IP)
   - Device type, browser, OS
   - Traffic source / referrer
   - Session duration & engagement
   - Page performance (Core Web Vitals)

3. **Dashboard Insights** — Login at `https://reignat.com` to see:
   - Active visitors right now
   - Traffic trends over time
   - Top pages, entry/exit pages
   - Traffic sources (Google, Facebook, direct, etc.)
   - Location heatmaps
   - Device & browser breakdowns

---

## Our Test Site Integration

### Site Details

| Item | Value |
|------|-------|
| **Site URL** | `https://test-mu-ten-20.vercel.app` |
| **Reignat Dashboard** | `https://reignat.com/test-mu-ten-20.vercel.app` (requires login) |
| **Site ID** | `80439c59-7400-411d-ae93-c7446d217403` |
| **Tracking Script** | `<script defer src="https://reignat.com/tracker.js" data-site="80439c59-7400-411d-ae93-c7446d217403"></script>` |

### What's Working on the Test Site

The Vercel test site (`https://test-mu-ten-20.vercel.app`) is an **Identity SDK — Test Console** that includes these pages:

| Page | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | SDK init, Authentication (Login/Sign Up), Identity Data panel |
| **News** | `news.html` | Tutorial cards (Python, Java, Data Science, Power BI) |
| **Tutorial** | `tutorial.html` | Multi-topic Tamil tutorial page |
| **API Demo** | `api-demo.html` | SDK API demos (Resolve, Anon ID, Track, Custom Event) |
| **Width Signature** | `widthsignature.html` | 52 FPJS font width signature extraction |
| **Font Detection v2** | `font_detection2.html` | Dual-baseline font validation (36 SDK fonts) |
| **Different Font** | `differentfont.html` | FPJS v4.0.2 52-font integrity check |
| **Font Visualization** | `font_visualization.html` | Serif / Sans-Serif / Monospace visual comparison |

### How the Integration Works

1. **Site added in Reignat** — The URL `test-mu-ten-20.vercel.app` was added as a site in the Reignat dashboard, which generated the unique `data-site="80439c59-7400-411d-ae93-c7446d217403"`.

2. **Script deployed** — The tracking snippet was pasted inside the `<head>` tag of all 8 HTML pages.

3. **Data flowing** — Every visitor to any page triggers the tracker:
   - Pageview is recorded
   - Visitor location is resolved (via IP)
   - Device/browser is detected
   - Session is tracked
   - Referrer/source is captured

4. **Dashboard access** — `https://reignat.com/test-mu-ten-20.vercel.app` redirects to the Reignat login page. After authentication, the dashboard shows all analytics for this site.

### What Reignat Tracks on Our Site

- ✅ How many visitors each page gets
- ✅ Where visitors come from (country, city)
- ✅ What devices/browsers they use
- ✅ How they found the site (Google, direct, etc.)
- ✅ How long they stay (session duration)
- ✅ Which pages they enter/exit from
- ✅ Page performance metrics
- ✅ Custom events (Track Page View, Track Custom Event buttons on SDK pages)

---

## Local Project Files

The same tracking script is also present in the local project at `C:\new_local_sdk\test\`:

```html
<script defer src="https://reignat.com/tracker.js" data-site="80439c59-7400-411d-ae93-c7446d217403"></script>
```

Included in: `index.html`, `news.html`, `tutorial.html`, `api-demo.html`, `widthsignature.html`, `font_visualization.html`, `font_detection2.html`, `differentfont.html`.

---

## How to View Analytics

1. Go to `https://reignat.com`
2. Sign in to your account
3. Select **test-mu-ten-20.vercel.app** from your sites list
4. View real-time and historical analytics

---

## Summary

> Reignat is a lightweight, privacy-first analytics tool. We added its tracking script to every page of our Identity SDK test console on Vercel. Now whenever someone visits `https://test-mu-ten-20.vercel.app`, Reignat captures visitor data and displays it on the dashboard at `https://reignat.com/test-mu-ten-20.vercel.app` — helping us understand our audience without invasive tracking.
