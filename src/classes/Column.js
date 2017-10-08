import pick from 'lodash/pick';

export default class Column {
    constructor(columnComponent) {
        const properties = pick(columnComponent, [
            'field', 'label', 'dataType', 'sortable', 'sortBy', 'filterable',
            'filterOn', 'hidden', 'formatter', 'cellClass', 'headerClass', 'checkbox',
        ]);

        for (const property in properties) {
            this[property] = columnComponent[property];
        }

        this.template = columnComponent.$scopedSlots.default;
    }

    isSortable() {
        return this.sortable;
    }
}
