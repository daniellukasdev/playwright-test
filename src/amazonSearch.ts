import { Browser, BrowserContext, chromium, Page } from "playwright";


(async () => {
    const browser: Browser = await chromium.launch({
                    headless: false,
                });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://www.amazon.com/");
    const title = await page.title();
    
    console.log(title);
    await browser.close();
})();

