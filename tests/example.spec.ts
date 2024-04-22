import { expect, test } from "@playwright/test";
import { BASE_URL } from "../src/consts";
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test("test", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole("link", { name: "Documents" }).click();
  await page.getByText("Video: How China and India").first().click();
  await expect(
    page.getByText("Video: How China and India").nth(1)
  ).toBeVisible();
});
