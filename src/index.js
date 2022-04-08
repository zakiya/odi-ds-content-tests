import dotenv from 'dotenv';
import { Shed } from "./shed.js";
import { Workshop } from "./workshop.js";

dotenv.config();

const shed = new Shed();

if (process.env.SOURCE) {
    shed.source = "repo";  
    shed.directoryPath = process.env.SOURCE;
}

const workshop = new Workshop(shed);
workshop.create();
