import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const fs = require("fs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Component {
  constructor(
    id,
    needsIconFonts = false,
    jsIndex = "/dist/index.js",
    cssIndex = "/index.css"
  ) {
    this.workshopDir = "workshop/";
    this.templateFile = "/template.html";
    this.directoryPath = path.join(__dirname, "../node_modules/@cagov/");
    this.id = id;
    this.needsIconFonts = needsIconFonts;
    this.jsIndex = jsIndex;
    this.cssIndex = cssIndex;
    this.templateFile = `${this.directoryPath}${id}${this.templateFile}`;
    this.destinationFile = `${this.workshopDir}${id}.html`;
  }

  hasTemplateFile() {
    if (fs.existsSync(this.templateFile)) {
      return true;
    }
    return false;
  }

  writeIndexEntry() {
    let entry = "";
    entry += `<p><a href="${this.id}.html">${this.id}</a></p>\n`;
    entry += `<li>Has template.html: ${this.hasTemplateFile()}</li>\n`;

    return entry;
  }

  writeHTML() {
    let code = "";
    code += `<head>\n`;
    code += fs.readFileSync(this.templateFile);
    code += `\n</head>\n`;

    fs.writeFile(this.destinationFile, code, (error) => {
      if (error) {
        return console.log(error);
      }
      return console.log(`Creating file ${this.destinationFile}.`);
    });
  }

  renderPage() {
    if (this.hasTemplateFile() === true) {
      this.writeHTML();
    }
  }
}
