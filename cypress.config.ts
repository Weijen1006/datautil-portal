import { defineConfig } from "cypress";
import mochawesome from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    charts: true,
    reportPageTitle: 'DataUtil Portal E2E Tests',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mochawesome(on);
      return config;
    },
  },
});
