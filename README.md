# NewMan_API_Execution

We're using a Newman executor with Node.js to initiate the postman collection along with it's environment variables. We're using Javascript as our scripting language along with required dependency management through the Node package manager.

````markdown
# Newman_Execution_With_Github_Actions

This repository contains GitHub Actions workflows for running Newman, a command-line collection runner for Postman.

## Overview

Newman is a command-line collection runner for Postman. It allows you to run and test a Postman Collection directly from the command line. This repository provides a setup for automating these tests using GitHub Actions.

## Features

- Automated testing of Postman collections using Newman
- Integration with GitHub Actions for CI/CD
- Customizable workflows to fit your testing needs

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Newman](https://github.com/postmanlabs/newman)

### Installation

1. Clone this repository:

- For git cloning using SSH method is recommended.

```bash
git clone https://github.com/delineate-pro/delineate-tqa-automation
cd delineate-tqa-automation
```
````

2. Install Newman globally:
   ```bash
   npm install -g newman
   ```

### Usage

1. Add your Postman collection and environment files to the repository.
2. Customize the GitHub Actions workflow file (`.github/workflows/newman.yml`) as needed.
3. Push your changes to the repository:
   ```bash
   git add .
   git commit -m "Add Postman collection and configure workflow"
   git push origin main
   ```

### GitHub Actions Workflow

The provided GitHub Actions workflow (`.github/workflows/newman.yml`) runs Newman tests on every push to the `main` branch. You can customize this workflow to fit your needs.

Example workflow file:

```yaml
name: Run Newman Tests

on:
  push:
    branches:
      - main

jobs:
  newman-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Install Newman
        run: npm install -g newman

      - name: Run Newman tests
        run: node newman_executor.js
```

Instead of using bash initiator, we're using a newman executor for robust and advance execution handling. for initiating your collection open newman_executor and change the collection & environment variable to your desired file with destination.

### For reporting we're using htmlextra reporter which provides us a detailed and well structured reporting scope.

- [HtmlExtraReporter](https://www.npmjs.com/package/newman-reporter-htmlextra)

## License

This project is licensed under the Delineate Pro.

## Contact

For any questions or inquiries, please open an issue or contact the repository owner.

```

```
