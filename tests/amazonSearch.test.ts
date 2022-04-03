import { describe, it } from "mocha";
import { expect } from "chai";
import { Browser, BrowserContext, chromium, Locator, Page } from "playwright";


describe("amazonQuery tests", () => {
    let browser: Browser, context: BrowserContext, page: Page;

    beforeEach(async function() {
        this.timeout(35000);
        browser = await chromium.launch({
            headless: false,
        });
        context = await browser.newContext();
        page = await context.newPage();
    })

    afterEach(async function() {
        await browser.close();
    })

    it("navigates to amazon.com", async () => {
        await page.goto("https://www.amazon.com/");
        const title = await page.title();
        console.log(title)
        expect(title).to.equal("Amazon.com. Spend less. Smile more.");
    })
});