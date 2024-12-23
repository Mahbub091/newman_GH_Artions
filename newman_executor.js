const newman = require("newman");

// Generate a timestamp with only the date (YYYY-MM-DD)
const timestamp = new Date().toISOString().split("T")[0];

newman.run(
  {
    collection: require("./collections/Test-Suite.postman_collection.json"), // Path to your collection
    environment: require("./collections/Staging_Env.postman_environment.json"), // Path to your environment
    iterationCount: 1,
    reporters: "htmlextra",
    reporter: {
      htmlextra: {
        export: `./Reports/report-${timestamp}.html`, // Path to save the HTML report with a timestamp
        title: "API Test Report",
        browserTitle: "Test Results",
      },
    },
    globalVar: [
      {
        key: "filePath",
        value: "../newman_GH_Artions/main.pdf", // Path to the file for upload
      },
    ],
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("Collection run complete! Report generated at ./Reports/report-" + timestamp + ".html");
  }
);
