import { describe, it } from "mocha";
import { expect } from "chai";
import { Browser, BrowserContext, chromium, Locator, Page } from "playwright";


describe("amazonSearch basic tests", () => {
    let browser: Browser, context: BrowserContext, page: Page;
    
    beforeEach(async function() {
        this.timeout(35000);
        browser = await chromium.launch({
            headless: false,
        });
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async function() {
        await browser.close();
    });

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
       
        const actulText: string = await page.inputValue('input#twotabsearchtextbox');
        console.log("actualText", actulText)
        
        expect(actulText).to.equal("nvidia 3060");
    });
});

describe("amazonSearch uery Tests", async () => {
    let browser: Browser, context: BrowserContext, page: Page;
    const queries: string[] = ["nvidia 3060", "nvidia 3070", "nvidia 3080"];
    const searched: string[] = [];

    beforeEach(async function() {
        this.timeout(35000);
        browser = await chromium.launch({
            headless: false,
        });
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async function() {
        await browser.close();
    });

    (async () => {
        for (const query of queries) {
           it(`Search for ${query}`, async () => {
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
                expect(searchedText).to.equal(query);
           });
        }
    })();
});