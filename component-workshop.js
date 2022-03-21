const path = require("path");
const fs = require("fs");

const vars = {
  directoryPath: path.join(__dirname, "node_modules/@cagov/"),
  workshopDir: "workshop/"
};

const eachComponent = {
  cssIndex: "/index.css",
  cssPathsToTry: ["/src/css/", "/", "/src/", "/dist/"],
  jsIndex: "/dist/index.js",
  writeEach: (component, templateFile) => {
    // Define the destination file.
    const destinationFile = `${vars.workshopDir}${component}.html`;

    // Put the page together.
    let code = "";
    code += eachComponent.writeEachCSS(component);
    code += eachComponent.writeEachJS(component);
    code += eachComponent.writeEachTools(component);
    code += fs.readFileSync(templateFile);

    // Write file.
    fs.writeFile(destinationFile, code, (error) => {
      if (error) {
        return console.log(error);
      }
      return console.log(`Creating file ${destinationFile}.`);
    });
  },
  writeEachCSS: (component) => {
    let cssCode = "";
    const componentPath = vars.directoryPath + component;

    // Check first for css in js.
    // @todo Refactor for less if checking.
    // Be consistent and or intentional about readFile vs. readFileSync.
    fs.readFile(`${componentPath}/dist/index.js`, (err, data) => {
      if (err) {
        cssCode = "";
        // console.log(`${component} doesn't have styles in js`);

        // There are no style
        try {
          let cssFile = "";

          eachComponent.cssPathsToTry.forEach((cssPath) => {
            if (
              fs.existsSync(componentPath + cssPath + eachComponent.cssIndex)
            ) {
              cssFile = componentPath + cssPath + eachComponent.cssIndex;
            }
          });

          cssCode += `<style type="text/css">\n`;
          cssCode += fs.readFileSync(cssFile);
          cssCode += `</style>\n`;
        } catch (error) {
          cssCode = "";
        }
      } else if (data.includes("var styles")) {
        // console.log(`${component} has styles in js`);
        // Do nothing.
      }
    });

    return cssCode;
  },
  writeEachJS: (component) => {
    let jsCode = "";
    const componentPath = vars.directoryPath + component;

    try {
      let jsFile = "";
      if (fs.existsSync(componentPath + eachComponent.jsIndex)) {
        jsFile = componentPath + eachComponent.jsIndex;
      }

      jsCode += `<script type="module">\n`;
      jsCode += fs.readFileSync(jsFile);
      jsCode += `</script>\n`;
    } catch (err) {
      jsCode = "";
    }

    return jsCode;
  },
  // Allow users to inject custom code aka "tools".
  writeEachTools: (component) => {
    let toolsCode = "";
    const toolsFile = `tools/${component}.js`;
    if (fs.existsSync(toolsFile)) {
      console.log("component");
      toolsCode = "";
      toolsCode = `<!--tools-->`;
      toolsCode = `<script type="module">\n`;
      toolsCode += fs.readFileSync(toolsFile);
      toolsCode += `</script>\n`;
      toolsCode += `<workshop-tools></workshop-tools>`;
    }
    return toolsCode;
  }
};

const demo = {
  template: "/template.html",
  indexFile: `${vars.workshopDir}index.html`,
  indexCode: "",
  makeIndex: (component) => {
    demo.indexCode += `<p><a href="${component}.html">${component}</a></p>\n`;
    fs.writeFile(demo.indexFile, demo.indexCode, (error) => {
      if (error) {
        return console.log(error);
      }
      return console.log(`Creating file ${demo.indexFile}.`);
    });
  },
  writeAllDemos: () => {
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
    });
  }
};

demo.writeAllDemos();
