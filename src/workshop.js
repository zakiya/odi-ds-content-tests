import { createRequire } from "module";

import path from "path";
import { fileURLToPath } from "url";
import { Component } from "./component.js";

const require = createRequire(import.meta.url);
const fs = require("fs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Workshop {
  constructor() {
    this.workshopDir = "workshop/";
    this.directoryPath = path.join(__dirname, "../node_modules/@cagov/");
    this.indexFile = `${this.workshopDir}index.html`;
    this.indexHTML = "";
  }

  create() {
    fs.readdir(this.directoryPath, (err, directories) => {
      // Catch error.
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }

      //  Read directories.
      directories.forEach((dir) => {
        const component = new Component(dir);
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
