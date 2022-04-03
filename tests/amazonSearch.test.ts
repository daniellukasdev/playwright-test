import { describe, it } from "mocha";
import { expect } from "chai";
import { Browser, BrowserContext, chromium, Locator, Page } from "playwright";


describe("amazonSearch tests", () => {
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

    it("should find search input and add query", async () => {
        await page.goto("https://www.amazon.com/");
        await page.locator('[aria-label="Search"]').click();
        await page.locator('[aria-label="Search"]').fill("nvidia 3060");
       
        const actulText: String = await page.inputValue('input#twotabsearchtextbox');
        console.log("actualText", actulText)
        
        expect(actulText).to.equal("nvidia 3060");
    });

    // await Promise.all([
    //     page.waitForNavigation(/*{ url: 'https://www.amazon.com/s?k=nvidia+3060&crid=21FUVI91FZNLT&sprefix=nvidia+3060%2Caps%2C83&ref=nb_sb_noss_1' }*/),
    //     page.locator('input:has-text("Go")').click()
    //   ]);
});