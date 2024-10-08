import { test, expect } from '../src/test';

test('has title', async ({ webApp }) => {
    // Expect a title "to contain" a substring.
    await expect(webApp.locator('title')).toHaveText(/Capacitor/);
});

test('get started link', async ({ webApp }) => {
    // Expect the "get started" button to link to https://capacitorjs.com.
    await expect(webApp.locator('.button', { hasText: 'Read more' })).toHaveAttribute('href', 'https://capacitorjs.com');
});
