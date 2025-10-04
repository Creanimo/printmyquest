import { immerable, produce } from "../../node_modules/immer/dist/immer.production.mjs";

/**
 * Represents a task with immutable updates.
 * @author Ferdinand Engländer
 */
export class Task {
    [immerable] = true;

    /**
     * Unique identifier of the task
     * @type {string}
     */
    id;

    /**
     * Title of the task
     * @type {string}
     */
    title;

    /**
     * Detailed description text
     * @type {string}
     */
    description;

    /**
     * Icon name representing the task visually
     * @type {string}
     */
    iconName;

    /**
     * Date when marked done, or null if not done
     * @type {Date | null}
     */
    markedDone;

    /**
     * Subtasks
     * @type {Task[]}
     */
    subtasks;

    /**
     * Creates a new Task instance.
     * @param {Object} params - Task properties
     * @param {string} params.id - Task unique id
     * @param {string} params.title - Task title
     * @param {string} params.description - Task description
     * @param {string} params.iconName - Icon name
     * @param {Date|null} [params.markedDone=null] - Date marked done (or null)
     * @param {Task[]} params.subtasks
     */
    constructor({
                    id,
                    title,
                    description,
                    iconName,
                    markedDone = null,
                    subtasks,
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.iconName = iconName;
        this.markedDone = markedDone;
        this.subtasks = subtasks;
    }

    /**
     * Internal helper that creates new immutable clone with updated properties.
     * @param {Partial<Task>} updates Properties to update
     * @returns {Task} New cloned instance with updates applied
     * @private
     */
    _withUpdate(updates) {
        return produce(this, draft => Object.assign(draft, updates));
    }

    /**
     * Marks task as done with current timestamp.
     * @returns {Task} New instance marked done
     */
    markDone() {
        return this._withUpdate({ markedDone: new Date() });
    }

    /**
     * Marks task as not done (removes marked done).
     * @returns {Task} New instance marked not done
     */
    markUndone() {
        return this._withUpdate({ markedDone: null });
    }

    /**
     * Updates the title text.
     * @param {string} newTitle The new title
     * @returns {Task} New instance with updated title
     */
    withTitle(newTitle) {
        return this._withUpdate({ title: newTitle });
    }

    /**
     * Updates the description text.
     * @param {string} newDescription The new description
     * @returns {Task} New instance with updated description
     */
    withDescription(newDescription) {
        return this._withUpdate({ description: newDescription });
    }

    /**
     * Updates the icon name.
     * @param {string} newIconName The new icon name
     * @returns {Task} New instance with updated icon
     */
    withIconName(newIconName) {
        return this._withUpdate({ iconName: newIconName });
    }

    /**
     * Updates the subtasks
     * @param {Task[]} a new array of subtasks
     * @returns {Task} New instance with updated icon
     */
    withSubtasks(subtasks) {
        return this._withUpdate({ subtasks });
    }

    /**
     * Adds a subtask (appends to subtasks).
     * @param {Task} subtask The subtask instance to add
     * @returns {Task} New instance with the subtask appended
     */
    addSubtask(subtask) {
        return this._withUpdate({ subtasks: [...this.subtasks, subtask] });
    }

    /**
     * Removes a subtask by its id.
     * @param {string} subtaskId The id of the subtask to remove
     * @returns {Task} New instance with the subtask removed
     */
    removeSubtask(subtaskId) {
        return this._withUpdate({
            subtasks: this.subtasks.filter(t => t.id !== subtaskId)
        });
    }

    /**
     * Updates a subtask by its id using an update function.
     * @param {string} subtaskId Subtask id to update
     * @param {(task: Task) => Task} updater Function taking Task, returning updated Task
     * @returns {Task} New instance with updated subtask
     */
    updateSubtask(subtaskId, updater) {
        return this._withUpdate({
            subtasks: this.subtasks.map(
                t => t.id === subtaskId ? updater(t) : t
            )
        });
    }

    /**
     * Replace a subtask by its id.
     * @param {Task} newSubtask The updated Task instance (must match id)
     * @returns {Task} New instance with replaced subtask
     */
    replaceSubtask(newSubtask) {
        return this.updateSubtask(newSubtask.id, () => newSubtask);
    }
}
