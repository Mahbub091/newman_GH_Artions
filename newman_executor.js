const newman = require("newman");

newman.run(
  {
    collection: require("./collections/Test-Suite.postman_collection.json"), // Path to your collection
    environment: require("./collections/Staging_Env.postman_environment.json"), // Path to your environment
    iterationCount: 1,
    reporters: "htmlextra",
    reporter: {
      htmlextra: {
        export: "./Reports/report.html", // Path to save the HTML report
        title: "API Test Report",
        browserTitle: "Test Results",
      },
    },
    globalVar: [
      {
        key: "filePath",
        value: "./main.pdf", // Path to the file for upload
      },
    ],
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("Collection run complete!");
  }
);
