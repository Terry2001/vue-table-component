<template>
    <th @click="clicked"
        role="columnheader"
        scope="col"
        v-if="this.isVisible && !this.isCheckbox"
        :class="thClass">
        {{ label }}
    </th>
    <th
        role="columnheader"
        scope="col"
        v-else-if="this.isVisible && this.isCheckbox"
        :class="thClass">
        <input type="checkbox" :id="this.markAllCheckBoxId" v-model="checkSignal"/>
    </th>
</template>

<script>
    import { classList } from '../helpers';

    export default {
        props: ['column', 'sort'],

        data() {
            return {
                checkSignal: false,
            }
        },
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

            isCheckbox() {

                return this.column.checkbox;
            },

            markAllCheckBoxId(){

                return this.column.field ? this.column.field + "_cbMarkAll" : "cbMarkAll";
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

        watch: {

            checkSignal: function(val){
                this.$emit('checkbox-changed', val);
            }

        },
    };
</script>
