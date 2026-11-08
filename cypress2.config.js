const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: false,
  },
  defaultCommandTimeout: 5000,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    baseUrl: "https://qauto2.forstudy.space/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    email: "vp2@gmail.com",
    password: "Qwerty123",
  },
});
