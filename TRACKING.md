# Reignat Visitor Tracking

## Overview

This site uses [Reignat](https://reignat.com/) for visitor tracking and analytics.

## Implementation

The tracking script is added to every page's `<head>` tag:

```html
<script defer src="https://reignat.com/tracker.js" data-site="80439c59-7400-411d-ae93-c7446d217403"></script>
```

- **`defer`** — Ensures the script loads after the HTML is parsed, without blocking page rendering.
- **`data-site`** — Your unique Reignat site ID (`80439c59-7400-411d-ae93-c7446d217403`).

## Pages Tracked

All 8 HTML pages include the snippet:

| Page | File |
|------|------|
| Home | `index.html` |
| News | `news.html` |
| Tutorial | `tutorial.html` |
| API Demo | `api-demo.html` |
| Width Signature | `widthsignature.html` |
| Font Visualization | `font_visualization.html` |
| Font Detection v2 | `font_detection2.html` |
| Different Font | `differentfont.html` |

## Adding to a New Page

Copy the script tag below into the `<head>` section of any new HTML page:

```html
<script defer src="https://reignat.com/tracker.js" data-site="80439c59-7400-411d-ae93-c7446d217403"></script>
```

## Dashboard

View visitor analytics at: [https://reignat.com/dashboard](https://reignat.com/dashboard)
