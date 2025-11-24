**Contributing / How to run tests locally**

Thanks for checking out this portfolio. If you'd like to run the Playwright tests locally or contribute improvements, follow these steps:

- Install Node.js 18+ and Git.
- From the repository root:

```powershell
cd Playwright-Automation
npm ci
npx playwright install
```

- Generate storage states used by the projects (optional):

```powershell
npm run generate-storage
```

- Run smoke tests:

```powershell
npm run test:smoke
```

- Lint and format code:

```powershell
npm run lint
npm run format
```

Notes:
- The `admin` project is included as a portfolio example and does not correspond to a separate admin dashboard on Sauce Demo.
- Do not commit real credentials or storage states. Use the example storage files under `storage/*.example.json`.
