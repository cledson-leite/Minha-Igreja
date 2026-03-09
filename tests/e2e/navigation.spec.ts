import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Igreja Gestão/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Membros');
  await expect(page).toHaveURL(/\/membros/);
  await expect(page.locator('h1')).toContainText('Gestão de Membros');
});
