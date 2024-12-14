**In-Class Activity: Building a CI/CD Pipeline for a Node.js App**

---

### **Objective**
Learn how to build a GitHub Actions pipeline for a Node.js application. The pipeline will:
- Perform linting to enforce code style and catch potential errors.
- Run dependency vulnerability checks.
- Conduct static security analysis on the source code.

This activity is divided into two parts:
1. **Walkthrough**: A guided step-by-step process to build a pipeline for a sample Node.js app.
2. **Challenge**: Apply your understanding to build a pipeline for a different Node.js app independently.

---

## **Part 1: Walkthrough**

### **Sample Node.js App**
Save the following files in a new repository.

#### **app.js**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js App!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### **package.json**
```json
{
  "name": "nodejs-ci-pipeline",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "eslint": "^8.42.0"
  }
}
```

#### **.eslintrc.json**
```json
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}
```

#### Install Dependencies
Run the following command to install dependencies:
```bash
npm install
```

---

### **Step-by-Step Pipeline Walkthrough**

#### **1. Initialize the Workflow File**
1. Create a `.github/workflows` directory in the root of your project.
2. Inside the directory, create a file called `nodejs-ci.yml`.

#### **2. Set Workflow Triggers**
Specify that the workflow should trigger on pushes to the `main` branch:

```yaml
name: Node.js CI Pipeline

on:
  push:
    branches:
      - main
```

#### **3. Set Up the Node.js Environment**
Use the `actions/setup-node` action to set up Node.js:

```yaml
jobs:
  lint-test-scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set Up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
```

#### **4. Install Dependencies**
Add a step to install the app dependencies:

```yaml
      - name: Install Dependencies
        run: npm install
```

#### **5. Run Linting**
Add a step to run `eslint`:

```yaml
      - name: Run ESLint Linter
        run: npm run lint
```

#### **6. Add a Dependency Vulnerability Check**
Use `npm audit` to check for vulnerabilities in dependencies:

```yaml
      - name: Run Dependency Vulnerability Check
        run: npm audit --audit-level=moderate
```

#### **7. Add a Security Scan**
Use `semgrep` for static analysis:

```yaml
      - name: Run Semgrep Security Scan
        uses: returntocorp/semgrep-action@v1
```

#### **Complete Workflow File**
Here’s the final `nodejs-ci.yml`:

```yaml
name: Node.js CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  lint-test-scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set Up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'

      - name: Install Dependencies
        run: npm install

      - name: Run ESLint Linter
        run: npm run lint

      - name: Run Dependency Vulnerability Check
        run: npm audit --audit-level=moderate

      - name: Run Semgrep Security Scan
        uses: returntocorp/semgrep-action@v1
```

---

## **Part 2: Challenge**

### **Scenario**
You are provided with a new Node.js application repository. Your task is to build a CI/CD pipeline similar to the one you built in Part 1. The new app has the following structure:

#### **New App Structure**
**`index.js`**:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Node.js Challenge!' });
});

app.listen(4000, () => {
  console.log('App running on port 4000');
});
```

**`package.json`**:
```json
{
  "name": "nodejs-challenge",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "eslint": "^8.42.0"
  }
}
```

### **Task**
1. **Create a Workflow**:
   - Trigger the pipeline on pushes to the `main` branch.
   - Set up Node.js 18.x.
   - Install the dependencies.
   - Add steps for linting, dependency checks, and security scanning.

2. **Test the Workflow**:
   - Push your changes to the `main` branch.
   - Confirm that the pipeline runs successfully and identifies any issues.

### **Deliverables**
- A `.github/workflows/nodejs-ci.yml` file in the repository.
- A brief explanation of how you built the pipeline and addressed any issues.

---

