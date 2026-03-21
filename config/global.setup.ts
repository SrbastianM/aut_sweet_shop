import { chromium } from "@playwright/test";
import { getEnv } from "../utils/envs";


export default async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await context.storageState({
        path: "storageState.json"
    })

    browser.close();
}