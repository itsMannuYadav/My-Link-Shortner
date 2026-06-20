import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];

  page.on("pageerror", (error) => errors.push(`PAGE: ${error.message}`));

  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  const bodyText = await page.locator("body").innerText();
  const hasErrorText = bodyText.includes("This page couldn't load");
  const hasForm = await page.locator("#url").count();

  console.log(
    JSON.stringify(
      {
        hasErrorText,
        hasForm,
        hasHeading: bodyText.includes("Shorten Long URLs"),
        errors,
      },
      null,
      2,
    ),
  );

  await browser.close();
}

main();
