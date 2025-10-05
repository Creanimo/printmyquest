export class GridUI {
    /**
     * @param {HTMLElement} target
     */
    constructor(target) {
        this.templateGrid = document.querySelector('#task-grid');
        this.templateColumnAddNew = document.querySelector('#task-column--empty');
        this.templateColumn = document.querySelector('#task-column');
        this.target = target;

        this.dummyDiv = document.createElement("div");
        this.dummyDiv.innerHTML = this.templateGrid.innerHTML;
        this.gridInstance = this.dummyDiv.firstElementChild;
        this.target.append(this.gridInstance);
    }

    appendColumnAddTask(columnID, addFunc) {
        const temp = this.dummyDiv;
        temp.innerHTML = this.templateColumnAddNew.innerHTML;

        // insert ID into template html
        temp.innerHTML = temp.innerHTML.replace("{{id}}", columnID);

        const column = temp.firstElementChild;
        this.gridInstance.append(column);

        const addButton = column.querySelector("wa-button");
        addButton.addEventListener("click", addFunc);
    }
}