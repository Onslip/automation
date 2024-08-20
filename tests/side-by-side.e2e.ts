import { test, expect } from '../src/test';

test.beforeEach(({ page }) => page.goto('/'));

test('has text', async ({ page, webApp: auto }) => {
    await expect(page.locator('title')).toHaveText(/Capacitor/);
    await expect(auto.locator('title')).toHaveText(/Capacitor/);
});

test('has attribute', async ({ page, webApp: auto }) => {
    await expect(page.locator('.button', { hasText: 'Read more' })).toHaveAttribute('href', 'https://capacitorjs.com');
    await expect(auto.locator('.button', { hasText: 'Read more' })).toHaveAttribute('href', 'https://capacitorjs.com');
});
