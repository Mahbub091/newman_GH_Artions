const newman = require("newman");
const fs = require('fs');
const path = require('path');

const timestamp = new Date().toISOString().split("T")[0];

const csvFilePath = `Reports/failed_API-${timestamp}.csv`;
const htmlReportPath = `Reports/report-${timestamp}.html`;

const csvHeader = [
  'method', 'url', 'status', 'code', 'responseTime', 'executedIteration', 'totalAssertions'
];
// fs.writeFileSync(csvFilePath, csvHeader.join(',') + '\n');

newman.run(
  {
    collection: require("./collections/Test-Suite.postman_collection.json"),
    environment: require("./collections/Staging_Env.postman_environment.json"),
    iterationCount: 1,
    reporters: ["htmlextra", "csv"],
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

    summary.run.executions.forEach((execution, index) => {
      const statusCode = execution.response.code;

      if (statusCode >= 400 && statusCode <= 600) {
        const method = execution.request.method;
        const url = execution.request.url.toString();
        const status = execution.response.status;
        const code = execution.response.code;
        const responseTime = execution.response.responseTime;
        const executedIteration = index + 1;
        const totalAssertions = execution.assertions.length;

        const csvRow = [
          method, url, status, code, responseTime, executedIteration, totalAssertions
        ].join(',');

        fs.appendFileSync(csvFilePath, csvRow + '\n');
      }
    });

    console.log(
      `Collection run complete! Reports generated at: \nHTML Report: ${htmlReportPath} \nCSV Report: ${csvFilePath}`
    );
  }
);
