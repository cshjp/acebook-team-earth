const { defineConfig } = require("cypress");
const { disconnect } = require("mongoose");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async clearDB() {
          const db = await connect();
          const users = db.collection("users");

          console.log("clear users");
          await users.deleteMany({});
          await users.dropIndexes({});
          
          await disconnect();

          return null;
        }
      })
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
});
