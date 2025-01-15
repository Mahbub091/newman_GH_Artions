const newman = require("newman");
const fs = require('fs');
const path = require('path');

const timestamp = new Date().toISOString().split("T")[0];

// Paths for the generated reports
const csvFilePath = path.join(__dirname, `./Reports/failed_API-${timestamp}.csv`);
const htmlReportPath = path.join(__dirname, `./Reports/report-${timestamp}.html`);

// CSV Header for failed API requests
const csvHeader = [
  'method', 'url', 'status', 'code', 'responseTime', 'executedIteration', 'totalAssertions'
];

// Create or overwrite CSV file and write the header
fs.writeFileSync(csvFilePath, csvHeader.join(',') + '\n');

// Run Newman with specified collection and environment
newman.run(
  {
    collection: require("./collections/Test-Suite.postman_collection.json"),
    environment: require("./collections/Staging_Env.postman_environment.json"),
    iterationCount: 1,
    reporters: ["htmlextra"], // Only HTML report is needed in reporter array
    reporter: {
      htmlextra: {
        export: htmlReportPath,
        title: "API Test Report",
        browserTitle: "Test Results",
        testFailSummary: true,
        logs: true,
      },
    },
  },
  function (err, summary) {
    if (err) {
      console.error('Newman run encountered an error:', err);
      return;
    }

    // Loop through execution results to identify failed requests
    summary.run.executions.forEach((execution, index) => {
      const statusCode = execution.response.code;

      // Only log failed requests (status codes 400-600)
      if (statusCode >= 400 && statusCode <= 600) {
        const method = execution.request.method;
        const url = execution.request.url.toString();
        const status = execution.response.status;
        const code = execution.response.code;
        const responseTime = execution.response.responseTime;
        const executedIteration = index + 1;
        const totalAssertions = execution.assertions.length;

        // Create a row for the CSV file for failed requests
        const csvRow = [
          method, url, status, code, responseTime, executedIteration, totalAssertions
        ].join(',');

        // Append the row to the CSV file
        fs.appendFileSync(csvFilePath, csvRow + '\n');
      }
    });

    console.log(
      `Collection run complete! Reports generated at: \nHTML Report: ${htmlReportPath} \nCSV Report: ${csvFilePath}`
    );
  }
);
