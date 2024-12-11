const newman = require("newman");

newman.run(
  {
    collection: require("./Test-Suite.postman_collection.json"),
    environment: require("./Staging_Env.postman_environment.json"),

    iterationCount: 1,
    reporters: "htmlextra",
    reporter: {
      htmlextra: {
        export: "./Reports/report.html",
        title: "Delineate API Test",
        browserTitle: "Delineate QA"
      },
    },
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("collection run complete!");
  }
);