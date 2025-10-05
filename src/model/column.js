import { immerable, produce } from "../../node_modules/immer/dist/immer.production.mjs";

/**
 * Represents a column containing tasks with immutable updates.
 */
export class Column {
    [immerable] = true;

    /**
     * @param {Object} params
     * @param {string} params.id Unique identifier for the column
     * @param {Task[]} [params.tasks=[]] Tasks in this column
     * @param {string} params.sortation
     */
    constructor({ id, tasks = [], sortation }) {
        this.id = id;
        this.tasks = tasks;
        this.sortation = sortation;
    }

    /**
     * Internal helper to create a new immutable instance with updates.
     * @param {Partial<Column>} updates Properties to update
     * @returns {Column} New immutable instance
     * @private
     */
    _withUpdate(updates) {
        return produce(this, draft => {
            Object.assign(draft, updates);
        });
    }

    withSortation(sortation) {
        return this._withUpdate(sortation);
    }

    /**
     * Adds a new task.
     * @param {Task} task New task to add
     * @returns {Column} New instance with the task added
     */
    addTask(task) {
        return this._withUpdate({ tasks: [...this.tasks, task] });
    }

    /**
     * Removes a task by ID.
     * @param {string} taskId ID of the task to remove
     * @returns {Column} New instance with the task removed
     */
    removeTask(taskId) {
        return this._withUpdate({
            tasks: this.tasks.filter(task => task.id !== taskId)
        });
    }

    /**
     * Replaces a task by ID.
     * @param {Task} updatedTask Task instance with updated data (must match existing ID)
     * @returns {Column} New instance with the task replaced
     */
    replaceTask(updatedTask) {
        return this._withUpdate({
            tasks: this.tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        });
    }
}
