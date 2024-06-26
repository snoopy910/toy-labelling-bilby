import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test("test", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole("link", { name: "Documents" }).click();
  await page.getByText("Video: How China and India").first().click();
  await expect(
    page.getByText("Video: How China and India").nth(1)
  ).toBeVisible();
});
