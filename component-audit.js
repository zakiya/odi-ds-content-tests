const path = require("path");
const fs = require("fs");

const demo = {
  directoryPath: path.join(__dirname, "node_modules/@cagov/"),
  demoContents: "",
  template: "/template.html",
  createDemoContents: (file) => {
    const contents = fs.readFileSync(file);
    console.log(contents);
    return contents;
  },
  writeDemo: (component, file) => {
    const destinationFile = `demo/${component}.html`;
    const code = demo.createDemoContents(file);
    fs.writeFile(destinationFile, code, (error) => {
      if (error) {
        return console.log(error);
      }
      return console.log(`Creating file ${destinationFile}.`);
    });
  }
};

// Read components directory.
fs.readdir(demo.directoryPath, (err, directories) => {
  // Catch error.
  if (err) {
    demo.demoContents = `Unable to scan directory: ${err}`;
  }

  directories.forEach((component) => {
    const file = `${demo.directoryPath}${component}${demo.template}`;
    if (fs.existsSync(file)) {
      demo.writeDemo(component, file);
    }
  });
});
