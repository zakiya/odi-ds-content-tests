import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const fs = require("fs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Component {
  constructor(id, jsIndex = "/dist/index.js", cssIndex = "/index.css") {
    this.empty = "";
    this.workshopDir = "workshop/";
    this.templateFile = "/template.html";
    this.directoryPath = path.join(__dirname, "../node_modules/@cagov/");
    this.id = id;
    this.needsIconFonts = ["ds-page-alert", "ds-link-icon"];
    this.jsIndex = jsIndex;
    this.cssIndex = cssIndex;
    this.templateFile = `${this.directoryPath}${id}${this.templateFile}`;
    this.destinationFile = `${this.workshopDir}${id}.html`;
    this.fontCSS = "ds-icons/src/icon-font.css";
  }

  hasTemplateFile() {
    if (fs.existsSync(this.templateFile)) {
      return true;
    }
    return false;
  }

  hasFontCSS() {
    if (this.needsIconFonts.includes(this.id)) {
      return true;
    }
    return false;
  }

  makeCSSCode(comment, body) {
    let cssCode = this.empty;
    cssCode += `<!-- ${comment} CSS -->\n`;
    cssCode += `<style type="text/css">\n`;
    cssCode += body;
    cssCode += `</style>\n`;
    return cssCode;
  }

  writeFonts() {
    let fontCode = "";
    if (this.hasFontCSS() === true) {
      fontCode = this.makeCSSCode(
        "Font",
        fs.readFileSync(this.directoryPath + this.fontCSS)
      );
    }
    return fontCode;
  }

  writeIndexEntry() {
    let entry = "";
    entry += `<p><a href="${this.id}.html">${this.id}</a></p>\n`;
    entry += `<ul>\n`;
    entry += `<li>template.html: ${this.hasTemplateFile()}</li>\n`;
    entry += `<li>icon font css: ${this.hasFontCSS()}</li>\n`;
    entry += `</ul>\n`;

    return entry;
  }

  writeHTML() {
    let code = "";
    code += `<head>\n`;
    code += this.writeFonts();
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
