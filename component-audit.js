const path = require("path");
const fs = require("fs");

const demo = {
  directoryPath: path.join(__dirname, "node_modules/@cagov/"),
  template: "/template.html",
  indexFile: "demo/index.html",
  indexCode: "",
  makeIndex: (component) => {
    demo.indexCode += `<p><a href="${component}.html">${component}</a></p>\n`;
  },
  writeCSS: (component) => {
    let code = ``;
    try {
      code += `<style type="text/css">\n`;
      code += fs.readFileSync(
        `${demo.directoryPath}${component}/src/css/index.css`
      );
      code += `</style>\n`;
    } catch (err) {
      code = "";
    }

    return code;
  },
  writeEach: (component, templateFile) => {
    // Define the destination file.
    const destinationFile = `demo/${component}.html`;

    // Put the page together.
    let code = demo.writeCSS(component);
    code += `<script type="module" src='dist/scripts.js'></script>\n`;
    code += fs.readFileSync(templateFile);

    // Write file.
    fs.writeFile(destinationFile, code, (error) => {
      if (error) {
        return console.log(error);
      }
      return console.log(`Creating file ${destinationFile}.`);
    });

    // Copy css.
    // Copy js.
  },
  writeAll: () => {
    // Read components directory.
    fs.readdir(demo.directoryPath, (err, directories) => {
      // Catch error.
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }

      directories.forEach((component) => {
        const templateFile = `${demo.directoryPath}${component}${demo.template}`;
        if (fs.existsSync(templateFile)) {
          demo.writeEach(component, templateFile);
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
