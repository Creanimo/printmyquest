import {GridUI} from "../view/gridUI.js";

export class AppController {
    constructor() {
        this.grid = new GridUI(document.body);
    }

    initFirstList() {
        this.grid.appendColumnAddTask("col_0", () => {console.log("button clicked")});
    }

    addTask(columnID) {
        
    }
}