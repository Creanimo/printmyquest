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
     * Creates a new Task instance.
     * @param {Object} params - Task properties
     * @param {string} params.id - Task unique id
     * @param {string} params.title - Task title
     * @param {string} params.description - Task description
     * @param {string} params.iconName - Icon name
     * @param {Date|null} [params.markedDone=null] - Date marked done (or null)
     */
    constructor({ id, title, description, iconName, markedDone = null }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.iconName = iconName;
        this.markedDone = markedDone;
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
}
