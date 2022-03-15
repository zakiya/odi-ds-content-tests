const path = require("path");
const fs = require("fs");

const demo = {
  directoryPath: path.join(__dirname, "node_modules/@cagov/"),
  demoContents: "",
  createDemoContents: (component) => `directory ${component}`,
  writeDemo: (component) => {
    const destinationFile = `demo/${component}.html`;
    const code = demo.createDemoContents(component);
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
    demo.writeDemo(component);
  });
});
