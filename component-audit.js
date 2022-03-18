const path = require("path");
const fs = require("fs");

const vars = {
  directoryPath: path.join(__dirname, "node_modules/@cagov/")
};

const eachComponent = {
  writeEach: (component, templateFile) => {
    // Define the destination file.
    const destinationFile = `demo/${component}.html`;

    // Put the page together.
    let code = eachComponent.writeCSS(component);
    code += `<script type="module" src='dist/scripts.js'></script>\n`;
    code += fs.readFileSync(templateFile);

    // Write file.
    fs.writeFile(destinationFile, code, (error) => {
      if (error) {
        return console.log(error);
      }
      return console.log(`Creating file ${destinationFile}.`);
    });

    // Copy js.
  },
  writeCSS: (component) => {
    let code = ``;
    const componentPath = vars.directoryPath + component;
    const index = "/index.css";
    const pathsToTry = ["/src/css/", "/", "/src/", "/dist/"];

    try {
      let cssFile = "";

      pathsToTry.forEach((cssPath) => {
        if (fs.existsSync(componentPath + cssPath + index)) {
          cssFile = componentPath + cssPath + index;
        }
      });

      code += `<style type="text/css">\n`;
      code += fs.readFileSync(cssFile);
      code += `</style>\n`;
      console.log(cssFile);
    } catch (err) {
      code = "";
    }

    return code;
  }
};

const demo = {
  template: "/template.html",
  indexFile: "demo/index.html",
  indexCode: "",
  makeIndex: (component) => {
    demo.indexCode += `<p><a href="${component}.html">${component}</a></p>\n`;
  },
  writeAll: () => {
    // Read components directory.
    fs.readdir(vars.directoryPath, (err, directories) => {
      // Catch error.
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }

      directories.forEach((component) => {
        const templateFile = `${vars.directoryPath}${component}${demo.template}`;
        if (fs.existsSync(templateFile)) {
          eachComponent.writeEach(component, templateFile);
          demo.makeIndex(component);
        }
      });

      fs.writeFile(demo.indexFile, demo.indexCode, (error) => {
        if (error) {
          return console.log(error);
        }
        return console.log(`Creating file ${demo.indexFile}.`);
      });
    });
  }
};

demo.writeAll();
