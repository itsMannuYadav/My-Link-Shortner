import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];

  page.on("pageerror", (error) => errors.push(`PAGE: ${error.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`CONSOLE: ${msg.text()}`);
  });

  const response = await page.goto("https://go.mannuyadav.me", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForTimeout(5000);

  const bodyText = await page.locator("body").innerText();
  const title = await page.title();
  const hasErrorText = bodyText.includes("This page couldn't load");
  const hasForm = await page.locator("#url").count();
  const hasHeading = bodyText.includes("Shorten Long URLs");

  console.log(
    JSON.stringify(
      {
        status: response?.status(),
        title,
        hasErrorText,
        hasForm,
        hasHeading,
        bodyPreview: bodyText.slice(0, 500),
        errors,
      },
      null,
      2,
    ),
  );

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
