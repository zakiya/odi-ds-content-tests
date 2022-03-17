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
  writeEach: (component, file) => {
    // Define the destination file.
    const destinationFile = `demo/${component}.html`;

    // Put the page together.
    let code = `<link rel="stylesheet" href="dist/styles.css">\n`;
    code += `<script type="module" src='dist/scripts.js'></script>\n`;
    code += fs.readFileSync(file);

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
        const file = `${demo.directoryPath}${component}${demo.template}`;
        if (fs.existsSync(file)) {
          demo.writeEach(component, file);
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
