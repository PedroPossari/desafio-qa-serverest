const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  defaultCommandTimeout: 20000,

  e2e: {
    specPattern: "cypress/e2e/web/*.cy.js",
    baseUrl: "https://front.serverest.dev",
    setupNodeEvents(on, config) {
    },
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
