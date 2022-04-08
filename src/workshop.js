import { createRequire } from "module";

import path from "path";
import { fileURLToPath } from "url";
import { Component } from "./component.js";

const require = createRequire(import.meta.url);
const fs = require("fs");

export class Workshop {
  constructor(shed) {
    this.workshopDir = shed.workshopDir;
    this.directoryPath = shed.directoryPath;
    this.indexFile = `${this.workshopDir}index.html`;
    this.indexHTML = "";
    this.shed = shed;
    this.excludeFiles = [
      ".DS_Store",
      "README.md",
      "UNIT-TESTS.md",
      "index.html",
      "components.11tydata.js",
    ];
  }

  create() {
    fs.readdir(this.directoryPath, (err, directories) => {
      // Catch error.
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }

      //  Read directories.
      directories.forEach((dir) => {
        if (!this.excludeFiles.includes(dir)) {
          const component = new Component(dir, this.shed);
          component.renderPage();
          this.indexHTML += component.writeIndexEntry();
        }
      });
      this.makeIndex(this.indexHTML);
    });
  }

  makeIndex(html) {
    fs.writeFile(this.indexFile, html, (error) => {
      if (error) {
        return console.log(error);
      }
      return "";
    });
  }
}
