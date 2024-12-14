import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config(
    {
      path: `envs/.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}`
    }
);

export default defineConfig({
  testDir: './tests',
  //snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: 'html',
  use: {
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      //dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
