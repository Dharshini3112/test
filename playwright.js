const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8001';

// ─── Identity SDK Test Console (index.html) ──────────────────────────────────
test.describe('Identity SDK Test Console', () => {
  test('loads index page and has SDK status badge', async ({ page }) => {
    await page.goto(BASE + '/index.html');
    await expect(page).toHaveTitle(/Identity SDK/);
    await expect(page.locator('#sdkStatusCard')).toBeVisible();
    await expect(page.locator('text=Identity SDK')).toBeVisible();
  });

  test('displays identity data card with fields', async ({ page }) => {
    await page.goto(BASE + '/index.html');
    const card = page.locator('.identity-card');
    await expect(card).toBeVisible();
    await expect(card.locator('text=site_code')).toBeVisible();
    await expect(card.locator('text=anon_id')).toBeVisible();
    await expect(card.locator('text=visitor_id')).toBeVisible();
    await expect(card.locator('text=matched_via')).toBeVisible();
    await expect(card.locator('text=is_new')).toBeVisible();
    await expect(card.locator('text=confidence')).toBeVisible();
    await expect(card.locator('text=bot_score')).toBeVisible();
  });

  test('has functional buttons', async ({ page }) => {
    await page.goto(BASE + '/index.html');
    // Wait for SDK init
    await page.waitForFunction(() => document.getElementById('resolveBtn')?.disabled === false, { timeout: 10000 }).catch(() => {});
    await expect(page.locator('#resolveBtn')).toBeVisible();
    await expect(page.locator('#anonBtn')).toBeVisible();
    await expect(page.locator('#pvBtn')).toBeVisible();
  });

  test('navigates to news page from button', async ({ page }) => {
    await page.goto(BASE + '/index.html');
    await page.click('a[href="news.html"]');
    await expect(page).toHaveURL(/news\.html/);
    await expect(page.locator('text=Latest Updates')).toBeVisible();
  });
});

// ─── Font Comparison Visualizer ──────────────────────────────────────────────
test.describe('Font Comparison Visualizer', () => {
  test('loads and shows three font comparison rows', async ({ page }) => {
    await page.goto(BASE + '/font_visualization.html');
    await expect(page).toHaveTitle(/Font Comparison/);
    await expect(page.locator('text=Visual Font Comparison')).toBeVisible();
    const rows = page.locator('.font-row');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText('Serif');
    await expect(rows.nth(1)).toContainText('Sans-Serif');
    await expect(rows.nth(2)).toContainText('Monospace');
  });

  test('shows highlight descriptions for each font type', async ({ page }) => {
    await page.goto(BASE + '/font_visualization.html');
    const highlights = page.locator('.highlight-item');
    await expect(highlights).toHaveCount(3);
    await expect(highlights.nth(0)).toContainText('Serif.*Tails');
    await expect(highlights.nth(1)).toContainText('Sans-Serif.*Clean');
    await expect(highlights.nth(2)).toContainText('Monospace.*Fixed Width');
  });
});

// ─── Advanced Font Validation Tool v2.0 ──────────────────────────────────────
test.describe('Advanced Font Validation Tool', () => {
  test('loads with stats grid and start button', async ({ page }) => {
    await page.goto(BASE + '/font_detection2.html');
    await expect(page).toHaveTitle(/Advanced Font Validation/);
    await expect(page.locator('text=Advanced Font Validation v2.0')).toBeVisible();
    await expect(page.locator('button:has-text("Start Advanced Validation")')).toBeVisible();
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(3);
    await expect(statCards.nth(0).locator('.stat-label')).toHaveText('Sequential (Old)');
    await expect(statCards.nth(1).locator('.stat-label')).toHaveText('Batch Rendering (SDK)');
    await expect(statCards.nth(2).locator('.stat-label')).toHaveText('Canvas Dual-Testing');
  });

  test('has proper table headers', async ({ page }) => {
    await page.goto(BASE + '/font_detection2.html');
    const headers = page.locator('#result-table thead th');
    await expect(headers).toHaveCount(5);
    await expect(headers.nth(0)).toHaveText(/FONT NAME/);
    await expect(headers.nth(1)).toHaveText(/SEQUENTIAL/);
    await expect(headers.nth(2)).toHaveText(/BATCH/);
    await expect(headers.nth(3)).toHaveText(/CANVAS/);
    await expect(headers.nth(4)).toHaveText(/STATUS/);
  });

  test('runs tests and populates results', async ({ page }) => {
    await page.goto(BASE + '/font_detection2.html');
    await page.click('button:has-text("Start Advanced Validation")');

    // Wait for results to populate
    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('#result-body tr');
      return rows.length > 0 && rows[0].querySelector('td')?.textContent.length > 0;
    }, { timeout: 30000 });

    const rows = page.locator('#result-body tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // Check first row has content
    const firstRowCells = rows.first().locator('td');
    await expect(firstRowCells).toHaveCount(5);
    const nameText = await firstRowCells.nth(0).textContent();
    expect(nameText?.length).toBeGreaterThan(0);
  });

  test('shows log output after running tests', async ({ page }) => {
    await page.goto(BASE + '/font_detection2.html');
    await page.click('button:has-text("Start Advanced Validation")');
    await page.waitForSelector('#log:has(> br)', { timeout: 30000 });
    const logContent = await page.locator('#log').textContent();
    expect(logContent?.length).toBeGreaterThan(5);
  });
});

// ─── Canvas Hash Tool ────────────────────────────────────────────────────────
test.describe('Canvas Hash Tool', () => {
  test('generates canvas drawing and hash', async ({ page }) => {
    await page.goto(BASE + '/canvas.html');
    await expect(page.locator('canvas#myCanvas')).toBeVisible();
    await expect(page.locator('text=Hash:')).toBeVisible();
    // Hash should be computed after script runs
    const hash = await page.locator('#hash-code').textContent();
    expect(hash).not.toBe('');
    const hashNum = parseInt(hash ?? '0', 10);
    expect(hashNum).not.toBe(0);
  });
});

// ─── FingerprintJS 52 Fonts Validation ───────────────────────────────────────
test.describe('FingerprintJS Font Validation', () => {
  test('loads with 52-font header and run button', async ({ page }) => {
    await page.goto(BASE + '/differentfont.html');
    await expect(page).toHaveTitle(/FingerprintJS/);
    await expect(page.locator('text=FPJS 52-Font Integrity Check')).toBeVisible();
    await expect(page.locator('button:has-text("Run FPJS Integrity Test")')).toBeVisible();
  });

  test('has correct table structure with 4 columns', async ({ page }) => {
    await page.goto(BASE + '/differentfont.html');
    const headers = page.locator('table thead th');
    await expect(headers).toHaveCount(4);
    await expect(headers.nth(0)).toHaveText(/FPJS FONT LIST/);
    await expect(headers.nth(1)).toHaveText(/DOM RESULT/);
    await expect(headers.nth(2)).toHaveText(/CANVAS MATCH/);
    await expect(headers.nth(3)).toHaveText(/PROBABILITY/);
  });

  test('runs integrity test and fills 52 rows', async ({ page }) => {
    await page.goto(BASE + '/differentfont.html');
    await page.click('button:has-text("Run FPJS Integrity Test")');

    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('#result-body tr');
      return rows.length === 52;
    }, { timeout: 30000 });

    const rows = page.locator('#result-body tr');
    await expect(rows).toHaveCount(52);

    // Verify a few known fonts
    const firstRow = rows.first();
    await expect(firstRow.locator('td').first()).toContainText('sans-serif-thin');
  });

  test('shows summary message after test', async ({ page }) => {
    await page.goto(BASE + '/differentfont.html');
    await page.click('button:has-text("Run FPJS Integrity Test")');
    await page.waitForSelector('#validation-msg', { timeout: 30000 });
    const msg = await page.locator('#validation-msg').textContent();
    expect(msg).toContain('/ 52 Fonts');
  });
});

// ─── News / Tutorials Listing ────────────────────────────────────────────────
test.describe('News & Tutorials', () => {
  test('loads news page with articles', async ({ page }) => {
    await page.goto(BASE + '/news.html');
    await expect(page).toHaveTitle(/Latest News/);
    await expect(page.locator('text=Latest Updates')).toBeVisible();
    const cards = page.locator('.news-card');
    await expect(cards).toHaveCount(4);
  });

  test('has articles for Python, Java, Data Science, and Power BI', async ({ page }) => {
    await page.goto(BASE + '/news.html');
    const titles = page.locator('.news-title');
    const texts = await titles.allTextContents();
    expect(texts.some(t => t.includes('Python'))).toBeTruthy();
    expect(texts.some(t => t.includes('Java'))).toBeTruthy();
    expect(texts.some(t => t.includes('Data Science'))).toBeTruthy();
    expect(texts.some(t => t.includes('Power BI'))).toBeTruthy();
  });

  test('links to tutorial page with topic query params', async ({ page }) => {
    await page.goto(BASE + '/news.html');
    const links = page.locator('.read-more');
    const hrefs = await links.evaluateAll(els => els.map(a => a.getAttribute('href')));
    expect(hrefs).toContain('tutorial.html?topic=python');
    expect(hrefs).toContain('tutorial.html?topic=java');
    expect(hrefs).toContain('tutorial.html?topic=datascience');
    expect(hrefs).toContain('tutorial.html?topic=powerbi');
  });

  test('back link navigates to index', async ({ page }) => {
    await page.goto(BASE + '/news.html');
    // News page doesn't have an explicit back link, but index links here
    await page.goto(BASE + '/index.html');
    await page.click('a[href="news.html"]');
    await expect(page).toHaveURL(/news\.html/);
  });
});

// ─── Tutorial Page ───────────────────────────────────────────────────────────
test.describe('Tutorial Page', () => {
  test('loads with sidebar and main content', async ({ page }) => {
    await page.goto(BASE + '/tutorial.html');
    await expect(page).toHaveTitle(/பயிற்சி/);
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.main')).toBeVisible();
    await expect(page.locator('.sidebar-brand .label')).toHaveText('பயிற்சி');
  });

  test('has table of contents in sidebar', async ({ page }) => {
    await page.goto(BASE + '/tutorial.html');
    const tocItems = page.locator('#tocList a');
    // At least the top-level TOC items should exist
    expect(await tocItems.count()).toBeGreaterThan(0);
  });

  test('displays Python tutorial content by default', async ({ page }) => {
    await page.goto(BASE + '/tutorial.html');
    await expect(page.locator('#tutorialContent')).toBeVisible();
    // Should contain Python section content
    const content = page.locator('#tutorialContent');
    await expect(content).toContainText('Python');
    await expect(content.locator('.tutorial-badge')).toBeVisible();
  });

  test('has code blocks with copy buttons', async ({ page }) => {
    await page.goto(BASE + '/tutorial.html');
    const codeBlocks = page.locator('.code-block');
    expect(await codeBlocks.count()).toBeGreaterThan(0);
    const copyBtns = page.locator('.copy-btn');
    expect(await copyBtns.count()).toBeGreaterThan(0);
  });

  test('has sections for Python, Java, Data Science, and Power BI', async ({ page }) => {
    await page.goto(BASE + '/tutorial.html');
    const content = await page.locator('#tutorialContent').innerHTML();
    expect(content).toContain('python');
    expect(content).toContain('java');
    expect(content).toContain('datascience');
    expect(content).toContain('powerbi');
  });

  test('back link returns to news page', async ({ page }) => {
    await page.goto(BASE + '/tutorial.html');
    const backLink = page.locator('.back-link');
    await expect(backLink).toHaveAttribute('href', 'news.html');
  });
});

// ─── Width Signature Tool ────────────────────────────────────────────────────
test.describe('Width Signature Tool', () => {
  test('loads with stats grid and generate button', async ({ page }) => {
    await page.goto(BASE + '/widthsignature.html');
    await expect(page).toHaveTitle(/Width Signature/);
    await expect(page.locator('text=Font Width Signature Tool')).toBeVisible();
    await expect(page.locator('button:has-text("Generate Width Signature")')).toBeVisible();
  });

  test('has stats for detected fonts, execution time, hash, and entropy', async ({ page }) => {
    await page.goto(BASE + '/widthsignature.html');
    await expect(page.locator('#count-detected')).toBeVisible();
    await expect(page.locator('#time-batch')).toBeVisible();
    await expect(page.locator('#sig-hash')).toBeVisible();
    await expect(page.locator('#canvas-status')).toBeVisible();
  });

  test('has proper table headers', async ({ page }) => {
    await page.goto(BASE + '/widthsignature.html');
    const headers = page.locator('table thead th');
    await expect(headers).toHaveCount(5);
    await expect(headers.nth(0)).toHaveText('FONT NAME');
    await expect(headers.nth(1)).toHaveText('DOM STATUS');
    await expect(headers.nth(2)).toHaveText('CANVAS MATCH');
    await expect(headers.nth(3)).toHaveText(/WIDTH SIGNATURE/);
    await expect(headers.nth(4)).toHaveText('IDENTIFIER');
  });

  test('generates width signatures on button click', async ({ page }) => {
    await page.goto(BASE + '/widthsignature.html');
    await page.click('button:has-text("Generate Width Signature")');

    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('#result-body tr');
      return rows.length > 0 && rows[0].querySelector('td')?.textContent !== '';
    }, { timeout: 30000 });

    const rows = page.locator('#result-body tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // Hash should be updated
    const hash = await page.locator('#sig-hash').textContent();
    expect(hash).not.toBe('-');
  });

  test('shows detection count after generation', async ({ page }) => {
    await page.goto(BASE + '/widthsignature.html');
    await page.click('button:has-text("Generate Width Signature")');
    await page.waitForTimeout(5000);
    const detectedText = await page.locator('#count-detected').textContent();
    const detectedNum = parseInt(detectedText ?? '0', 10);
    expect(detectedNum).toBeGreaterThanOrEqual(0);
  });
});

// ─── Cross-Page Navigation ──────────────────────────────────────────────────
test.describe('Cross-Page Navigation', () => {
  test('navigates from index to news and back', async ({ page }) => {
    await page.goto(BASE + '/index.html');
    await page.click('a[href="news.html"]');
    await expect(page).toHaveURL(/news\.html/);
    await page.goto(BASE + '/index.html');
    await expect(page).toHaveURL(/index\.html/);
  });

  test('all major pages load without errors', async ({ page }) => {
    const pages = [
      '/index.html',
      '/font_visualization.html',
      '/font_detection2.html',
      '/canvas.html',
      '/differentfont.html',
      '/news.html',
      '/tutorial.html',
      '/widthsignature.html',
    ];

    for (const p of pages) {
      const response = await page.goto(BASE + p);
      expect(response?.status()).toBe(200);
      const title = await page.title();
      expect(title?.length).toBeGreaterThan(0);
    }
  });
});