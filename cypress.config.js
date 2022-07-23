const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      baseUrl: "https://cursos.alura.com.br",
      requestTimeout: 30000,
      defaultCommandTimeout: 5000,
      chromeWebSecurity: false,
      experimentalSessionAndOrigin: true,
      pageLoadTimeout: 120000
  },
  reporter: 'mochawesome',
    reporterOptions: {
      overwrite: true,
      json: true,
      html: false,
      //timestamp: 'dd-mm-yyyy_(HH-MM)',
      reportFilename: "[name]",
      reportDir: "cypress/report/mochawesome-report" 
    }
});
