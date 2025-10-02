import { log } from "../tools/logger.js";
import { createID } from "./createID.js";

class Dependencies {
    constructor() {
        this.log = log;
        this.createId = createID;
    }
}

const dependencyInjection = new Dependencies();

export { dependencyInjection };
