// import fs, { Dirent } from 'fs';    // fs module and Dirent type
// import path from 'path';    // import path module of node.js (because test works in browser environment)
// import { startBundleServer } from './browserTest/settings/bundleServer';    // import function to start server given by bundler
// import { port, settingsPath, testEnvPath } from './env';    // import port, setting file path, test environment path
// import puppeteer from 'puppeteer';

// const { setup: setupPuppeteer } = require('jest-environment-puppeteer');
// // jest-environment-puppeteer : tests jest with puppeteer
// // setupPuppeteer : assign setup function of jest-environment-puppeteer to setupPuppeteer
// // const {} = require() commonJS style

// function readdir(directory: string): Promise<Dirent[]> {
//     return new Promise((resolve, reject) => {
//         fs.readdir(
//             directory,
//             {
//                 withFileTypes: true,
//             },
//             (error, dirents) => {
//                 if (error) {
//                     reject();
//                     return;
//                 }

//                 resolve(dirents);
//             }
//         );
//     });
// }

// async function getFilesEndsWithRecursively(
//     directory: string,
//     endsOfPaths: string[],
// ): Promise<string[]> {
//     // function readdir returns Dirent[]
//     const items = await readdir(directory);
//     const testCodePaths: string[] = [];
//     await Promise.all(
//         items.map(async (item) => {
//             const itemPath = path.join(directory, item.name);
//             if (!itemPath) {
//                 return;
//             }

//             // pushs to testCodePaths => .browsertest.ts, .browsertest.tsx
//             if (item.isFile() && endsOfPaths.some((x) => itemPath.endsWith(x))) {
//                 testCodePaths.push(itemPath);
//             }

//             // If it is folder, checks inside the folder recusively
//             if (item.isDirectory()) {
//                 const codePaths = await getFilesEndsWithRecursively(
//                     itemPath,
//                     endsOfPaths
//                 );
//                 testCodePaths.push(...codePaths);
//             }
//         })
//     );

//     return testCodePaths;
// }

// async function setRequires() {
//     const browserTestDirectoryPath = path.join(__dirname, "browserTest");

//     // needs to test in browser environment => .browsertest.ts, .browsertest.tsx
//     const browserTestCodePaths = await getFilesEndsWithRecursively(
//         browserTestDirectoryPath,
//         [".browsertest.ts", ".browsertest.tsx"],
//     );

//     const requiresFilePath = path.join(settingsPath, "requires.ts");

//     // gets relative path of requires.ts
//     // makes string like console.log(require("~~~")) 
//     // writes using function writeFile into requires.ts
//     const requiresFileContent = browserTestCodePaths.map((browserTestCodePath) => path.relative(settingsPath, browserTestCodePath))
//                                                     .map((browserTestCodePath) => `console.log(require("${browserTestCodePath.replace(/\\/g, "/")}"));`)
//                                                     .join("\n");

//     await new Promise((resolve, reject) => {
//         fs.writeFile(requiresFilePath, requiresFileContent, (err) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }

//             resolve();
//         });
//     });
// }

// async function setTestEnv() {
//     // runs puppeteer
//     const browser = await puppeteer.launch();

//     // opens new page in browser environment
//     const page = await browser.newPage();

//     // connects bundle server address
//     await page.goto(`http://localhost:${port}`);

//     // waits rendering (css selector id="root")
//     await page.waitForSelector("#root");

//     // brings itTestCaseNames (String[] type, browser context global variables) from BrowserTest.ts
//     const itTestCaseNames = (await page.evaluate(() => {
//         return (window as any).itTestCaseNames;
//     })) as string[];

//     // writes string testEnvContent into testEnv file
//     const testEnvContent = `export const itTestCaseNames = ${JSON.stringify(
//         itTestCaseNames,
//         null,
//         2
//     )};`;

// }