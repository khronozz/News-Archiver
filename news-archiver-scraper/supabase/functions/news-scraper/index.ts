/**
 * Copyright 2023 Nicolas Favre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * index.ts
 * Function to screenshot news websites and publish them to Supabase Storage
 *
 * @author Nicolas Favre
 * @date 19.06.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */


import {serve} from "std/server";
import puppeteer from 'puppeteer';
import {createClient} from "@supabase/supabase-js";
import * as data from './news_websites.json' assert {type: "json"};

serve(async () => {
    try {
        console.log("[x] Scraping news...")

        // Access the news_url array
        const newsUrls = data.default.news_url;

        // Connect to Supabase
        const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_KEY"))

        // Connect to Browserless
        const browser = await puppeteer.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=${Deno.env.get(
                "PUPPETEER_BROWSERLESS_IO_KEY"
            )}`,
            args: ['--start-maximized'],
        });

        // Loop through news websites
        for (const newsPage of newsUrls) {

            const page = await browser.newPage();

            await page.setViewport({
                width: 1920,
                height: 1080,
            });

            // Screenshot news page
            await page.goto(newsPage.url, {waitUntil: "networkidle2"});

            // Wait for page to load completely
            await page.waitForTimeout(20000);

            // Take full page screenshot
            const screenshot = await page.screenshot(
                {fullPage: true}
            );

            // Set file type to png
            const file = new File([screenshot], newsPage.name + ".png", {type: "image/png"});

            // Set filename with date
            const date = Date.now()
            const filename = newsPage.name + "_" + date + ".png"

            console.log("[x] Upload news " + newsPage.name + " archive...")
            // Upload file to Supabase Storage
            const {data, error} = await supabase.storage
                .from("news-archives")
                .upload(newsPage.name + "/" + filename, file, {
                    cacheControl: "3600",
                    upsert: false,
                });
            console.log("[x] Data returned from Supabase: ", data)
            console.log("[x] Error returned from Supabase: ", error)
            console.log("[x] Done uploading " + newsPage.name + " news archive")
        }

        console.log("[x] Done scraping news")

        return new Response(JSON.stringify({message: "News scraped successfully"}), {
            headers: {"Content-Type": "application/json"},
        })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {
            headers: {"Content-Type": "application/json"},
            status: 500,
        });
    }
})
