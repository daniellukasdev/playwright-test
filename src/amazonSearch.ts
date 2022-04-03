import { Browser, BrowserContext, chromium, Page } from "playwright";

const queries: string[] = ["nvidia 3060", "nvidia 3070", "nvidia 3080"];

(async () => {
    for (const query of queries) {
            // creates new browser and context
            const browser: Browser = await chromium.launch({
                headless: false,
            });
            const context: BrowserContext = await browser.newContext();

            // creates new page for amazon.com
            const page: Page = await context.newPage();
            await page.goto("https://www.amazon.com/");
            console.log("query", query)
            await page.waitForSelector('[aria-label="Search"]');
            await page.locator('[aria-label="Search"]').click();
            await page.locator('[aria-label="Search"]').fill(`${query}`);

            await Promise.all([
                page.waitForNavigation(),
                page.locator('input:has-text("Go")').click()
            ]);

            await page.waitForSelector('[aria-label="Search"]');
            const searchedText: string = await page.inputValue('[aria-label="Search"]');
            console.log(searchedText);
            await browser.close();
    }
})();
