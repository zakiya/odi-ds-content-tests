import { Shed } from "./shed.js";
import { Workshop } from "./workshop.js";

const shed = new Shed();

const workshop = new Workshop(shed);
workshop.create();
