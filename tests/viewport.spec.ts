import { expect, test } from '@playwright/test';

// Remote image hosts aren't required for a visual-layout smoke test.
const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAOr8lq0AAAAASUVORK5CYII=', 'base64');

async function startRound(page: import('@playwright/test').Page) {
  await page.route('**/*', async route => {
    if (route.request().resourceType() === 'image') {
      await route.fulfill({ status: 200, contentType: 'image/png', body: pixel });
    } else {
      await route.continue();
    }
  });
  await page.goto('/');
  await page.getByRole('button', { name: /START GAME/i }).click();
  await expect(page.locator('.game-image')).toBeVisible();
  await expect(page.getByRole('button', { name: /^REAL/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /^AI/i })).toBeVisible();
}

for (const [width, height] of [
  [1440, 900], [1280, 720], [1024, 640], [390, 844],
  [375, 667], [360, 640], [320, 568], [844, 390],
  [667, 375],
]) {
  test(`game viewport ${width}×${height} fits without scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await startRound(page);
    const bounds = await page.evaluate(() => {
      const stage = document.querySelector('.image-stage')!.getBoundingClientRect();
      const buttons = document.querySelector('.choice-grid')!.getBoundingClientRect();
      const hint = document.querySelector('.blind-hint')!.getBoundingClientRect();
      return {
        scrollHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        stageTop: stage.top,
        stageHeight: stage.height,
        buttonsBottom: buttons.bottom,
        hintBottom: hint.bottom,
        stageWidth: stage.width,
      };
    });
    expect(bounds.scrollHeight).toBeLessThanOrEqual(height + 2);
    expect(bounds.stageTop).toBeGreaterThanOrEqual(0);
    expect(bounds.stageHeight).toBeGreaterThan(100);
    expect(bounds.stageWidth).toBeGreaterThan(100);
    expect(bounds.buttonsBottom).toBeLessThanOrEqual(height);
    expect(bounds.hintBottom).toBeLessThanOrEqual(height);
  });
}

test('ten blind guesses reveal results only at the end', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await startRound(page);
  for (let round = 0; round < 9; round += 1) {
    await page.getByRole('button', { name: /^REAL/i }).click();
    await expect(page.locator('.results-page')).toHaveCount(0);
    await expect(page.locator('.reveal-panel, .image-answer-label')).toHaveCount(0);
  }
  await page.getByRole('button', { name: /^REAL/i }).click();
  await expect(page.locator('.results-page')).toBeVisible();
  await expect(page.getByText('YOUR FINAL SCORE')).toBeVisible();
});
