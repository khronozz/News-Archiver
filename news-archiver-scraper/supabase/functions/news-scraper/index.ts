import {serve} from "std/server";
import puppeteer from 'puppeteer';

serve(async () => {
    try {
        console.log("[x] Scraping news...")

        const browser = await puppeteer.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=${Deno.env.get(
                "PUPPETEER_BROWSERLESS_IO_KEY"
            )}`,
        });
        const page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 3,
        });

        await page.goto("https://en.wikipedia.org/wiki/Rickrolling", {waitUntil: "networkidle2"});
        const screenshot = await page.screenshot();

        console.log("[x] Done scraping news")
        console.log("[x] Publishing news...")
        console.log("[x] Done publishing news")

        return new Response(screenshot, {
            headers: {"Content-Type": "image/png"},
        });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {
            headers: {"Content-Type": "application/json"},
            status: 500,
        });
    }
})
