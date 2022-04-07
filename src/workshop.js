import { createRequire } from "module";

import path from "path";
import { fileURLToPath } from "url";
import { Component } from "./component.js";

const require = createRequire(import.meta.url);
const fs = require("fs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Workshop {
  constructor(shed) {
    this.workshopDir = shed.workshopDir;
    this.directoryPath = shed.directoryPath;
    this.indexFile = `${this.workshopDir}index.html`;
    this.indexHTML = "";
    this.shed = shed;
  }

  create() {
    fs.readdir(this.directoryPath, (err, directories) => {
      // Catch error.
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }

      //  Read directories.
      directories.forEach((dir) => {
        const component = new Component(dir, this.shed);
        component.renderPage();
        this.indexHTML += component.writeIndexEntry();
      });
      this.makeIndex(this.indexHTML);
    });
  }

  makeIndex(html) {
    console.log();
    fs.writeFile(this.indexFile, html, (error) => {
      if (error) {
        return console.log(error);
      }
      return "";
    });
  }
}
