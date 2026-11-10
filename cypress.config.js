const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: false,
  },
  defaultCommandTimeout: 1000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    email: "vp1@gmail.com",
    password: "Qwerty123",
  },
});
