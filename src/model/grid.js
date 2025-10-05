import { produce, immerable } from "../../node_modules/immer/dist/immer.production.mjs";

/**
 * Represents the entire grid's state, including columns and selection.
 */
export class Grid {
    [immerable] = true;

    constructor(columns = [], selectedColumnId = null) {
        this.columns = columns;
        this.selectedColumnId = selectedColumnId;
    }

    /**
     * Adds a new column.
     * @param {Object} column - New column object
     * @returns {GridState}
     */
    addColumn(column) {
        return produce(this, draft => {
            draft.columns.push(column);
        });
    }

    /**
     * Removes a column by id.
     * @param {string} columnId
     * @returns {GridState}
     */
    removeColumn(columnId) {
        return produce(this, draft => {
            draft.columns = draft.columns.filter(c => c.id !== columnId);
            if (draft.selectedColumnId === columnId) {
                draft.selectedColumnId = null;
            }
        });
    }
}
