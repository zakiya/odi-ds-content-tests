import { Shed } from "./shed.js";
import { Workshop } from "./workshop.js";

const shed = new Shed();
shed.directoryPath = "/Users/zakiya/Sites/design-system/components/";
shed.source = "repo";

const workshop = new Workshop(shed);
workshop.create();
