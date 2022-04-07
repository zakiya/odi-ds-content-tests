import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class Shed {
  constructor() {
    this.workshopDir = "workshop/";
    this.directoryPath = path.join(__dirname, "../node_modules/@cagov/");
  }
}
