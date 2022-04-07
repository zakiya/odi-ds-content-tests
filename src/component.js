import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const fs = require("fs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Component {
  constructor(id) {
    this.id = id;

    this.empty = "";
    this.workshopDir = "workshop/";
    this.templateFile = "/template.html";
    this.directoryPath = path.join(__dirname, "../node_modules/@cagov/");
    this.needsIconFonts = ["ds-page-alert", "ds-link-icon"];
    this.assets = {
      js: {
        type: "js",
        pathsToTry: ["/src/", "/dist/"],
        index: "index.js",
        relativePath: ""
      },
      css: {
        type: "css",
        pathsToTry: ["/src/css/", "/", "/src/", "/dist/"],
        index: "index.css",
        relativePath: ""
      }
    };
    this.toolsFile = `src/tools/${id}.js`;
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

  hasCSS() {
    return this.setCorrectAsset(this.assets.css);
  }

  hasJS() {
    return this.setCorrectAsset(this.assets.js);
  }

  stylesInJsStatus() {
    let status = null;
    if (this.hasJS() === true) {
      const jsStatus = [
        "1 - Has a js file but no css in js.",
        "2 - Has css in js.",
        "3 - No css in js."
      ];
      const [one, two, three] = jsStatus;

      try {
        const js = fs.readFileSync(
          this.directoryPath + this.id + this.assets.js.relativePath
        );
        status = js.includes("var styles") ? two : one;
      } catch (e) {
        status = three;
      }
    }
    return status;
  }

  setCorrectAsset(asset) {
    let status = false;
    asset.pathsToTry.forEach((assetPath) => {
      const file = this.directoryPath + this.id + assetPath + asset.index;
      if (fs.existsSync(file)) {
        status = true;
        Object.defineProperty(this.assets[asset.type], "relativePath", {
          value: assetPath + asset.index
        });
      }
    });
    return status;
  }

  makeCSSCode(comment, body) {
    let cssCode = this.empty;
    cssCode += `<!-- ${comment} CSS -->\n`;
    cssCode += `<style type="text/css">\n`;
    cssCode += body;
    cssCode += `</style>\n`;
    return cssCode;
  }

  makeJSCode(comment, body) {
    let jsCode = this.empty;
    jsCode += `<!-- ${comment} JS -->\n`;
    jsCode += `<script type="module">\n`;
    jsCode += body;
    jsCode += `</script>\n`;
    return jsCode;
  }

  writeTools() {
    let toolsCode = this.empty;
    if (fs.existsSync(this.toolsFile)) {
      toolsCode = this.makeJSCode("Tools", fs.readFileSync(this.toolsFile));
    }
    return toolsCode;
  }

  writeFontCSS() {
    let fontCode = this.empty;
    if (this.hasFontCSS() === true) {
      fontCode = this.makeCSSCode(
        "Font",
        fs.readFileSync(this.directoryPath + this.fontCSS)
      );
    }
    return fontCode;
  }

  writeJS() {
    let jsCode = this.empty;
    if (this.stylesInJsStatus() != null) {
      jsCode = this.makeJSCode(
        "Component",
        fs.readFileSync(
          this.directoryPath + this.id + this.assets.js.relativePath
        )
      );
    }
    return jsCode;
  }

  writeCSS() {
    let cssCode = this.empty;
    if (
      this.stylesInJsStatus() !== "2 - Has css in js." &&
      this.hasCSS() === true
    ) {
      cssCode = this.makeCSSCode(
        "Component",
        fs.readFileSync(
          this.directoryPath + this.id + this.assets.css.relativePath
        )
      );
    }
    return cssCode;
  }

  writeIndexEntry() {
    let entry = "";
    entry += `<h3>`;
    entry += this.hasTemplateFile()
      ? `<a href="${this.id}.html">${this.id}</a>`
      : this.id;
    entry += `</h3>\n`;
    entry += `<details style="margin-left: 20px;"><summary>Details</summary><ul>\n`;
    entry += `<li>template.html: ${this.hasTemplateFile()}</li>\n`;
    entry += `<li>icon font css: ${this.hasFontCSS()}</li>\n`;
    entry += `<li>css: ${this.hasCSS()} ${this.assets.css.relativePath}</li>\n`;
    entry += `<li>js: ${this.hasJS()} <ul><li>${
      this.assets.js.relativePath
    }</li>`;
    entry += this.hasJS() ? `<li>${this.stylesInJsStatus()}</li> \n` : "";
    entry += `</li></ul>\n`;
    entry += `</li>\n`;
    entry += `</ul>\n`;
    entry += `</details>\n`;

    return entry;
  }

  writeHTML() {
    let code = "";
    code += `<head>\n`;
    code += this.writeTools();
    code += this.writeCSS();
    code += this.writeJS();
    code += this.writeFontCSS();
    code += `</head>\n`;
    code += `<body>\n`;
    code += fs.readFileSync(this.templateFile);
    code += `\n</body>\n`;

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
