const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // activa la grabación de video
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
