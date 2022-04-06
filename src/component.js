const fs = require("fs");
const path = require("path");

class Component {
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
}

const zakiya = new Component("ds-back-to-top");
zakiya.needsIconFonts = true;
zakiya.writeHTML();
