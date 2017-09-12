<template>
    <th @click="clicked"
        role="columnheader"
        scope="col"
        v-if="this.isVisible"
        :class="thClass">
        {{ label }}
    </th>
</template>

<script>
    import { classList } from '../helpers';

    export default {
        props: ['column', 'sort'],

        computed: {
            ariaSort() {
                if (! this.column.isSortable()) {
                    return false;
                }

                if (this.column.field === this.sort.fieldName) {
                    return true;
                }

                return false;
            },

            isVisible() {
                return ! this.column.hidden;
            },

            label() {
                if (this.column.label === null) {
                    return this.column.field;
                }

                return this.column.label;
            },

            thClass() {

                if (! this.column.isSortable()) {
                    return classList(this.column.headerClass);
                }

                if (this.column.field === this.sort.fieldName) {
                    return classList(this.column.headerClass, "active " + (this.sort.order === 'asc' ? "sorting_asc" : "sorting_desc"));
                }

                return classList(this.column.headerClass, "sorting");
            },
        },

        methods: {
            clicked() {
                if (this.column.isSortable()) {
                    this.$emit('click', this.column);
                }
            },
        },
    };
</script>
