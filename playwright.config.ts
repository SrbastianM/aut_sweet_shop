import { defineConfig, devices } from '@playwright/test';
import { Status } from "allure-js-commons";
import dotenv from "dotenv";
import * as os from "node:os";


dotenv.config();

export default defineConfig({
  globalSetup: "./config/global.setup.ts",
  testDir: './front/test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["line"],
    [
      "allure-playwright", {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: true,
        links: {
          issue: {
            nameTemplate: "Issue #%s",
            urlTemplate: "https://issues.example.com/%s",
          },
          tms: {
            nameTemplate: "TMS #%s",
            urlTemplate: "https://tms.example.com/%s",
          },
        },
        categories: [
          {
            name: "foo",
            messageRegex: "bar",
            traceRegex: "baz",
            matchedStatuses: [Status.FAILED, Status.BROKEN],
          },
        ],
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ]
  ],
  use: {
    baseURL: process.env.BASE_URL,
    storageState: "storageState.json",
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'front_chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
