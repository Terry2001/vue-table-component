<template>
    <div class="row">
        <div class="table-container">
            <table :id="tableId" :class="fullTableClass" >
                <thead>
                <tr>
                    <table-column-header
                            @click="columnHeaderClick"
                            @checkbox-changed="checkboxChanged"
                            v-for="column in columns"
                            :key="column.field"
                            :sort="sort"
                            :column="column"
                    ></table-column-header>
                </tr>
                </thead>
                <tbody>
                <table-row
                        v-for="row in displayedRows"
                        :key="row.vueTableComponentInternalRowId"
                        :row="row"
                        :columns="columns"
                        @row-clicked="rowClicked"
                ></table-row>
                </tbody>
            </table>
        </div>

        <div style="display:none;">
            <slot></slot>
        </div>

        </div>
</template>

<script>
    import Column from '../classes/Column';
    import Row from '../classes/Row';
    import TableColumnHeader from './TableColumnHeader';
    import TableRow from './TableRow';
    import settings from '../settings';
    import isArray from 'lodash/isArray';
    import pick from 'lodash/pick';
    import { classList } from '../helpers';

    export default {
        components: {
            TableColumnHeader,
            TableRow
        },

        props: {
            tableId: {default: ""},
            data: {default: () => [], type: [Array, Function]},

            keyField: {default: ""},

            showFilter: { default: true },
            showCaption: { default: true },

            sortBy: { default: '', type: String },
            sortOrder: { default: '', type: String },

            cacheKey: { default: null },
            cacheLifetime: { default: 5 },

            tableClass: { default: settings.tableClass },
            filterInputClass: { default: settings.filterInputClass },
            filterPlaceholder: { default: settings.filterPlaceholder },
            filterNoResults: { default: settings.filterNoResults },
        },

        data: () => ({
            columns: [],
            rows: [],
            filter: '',
            sort: {
                fieldName: '',
                order: '',
            },
            pagination: null,
            localSettings: {},
        }),

        created() {
            this.sort.fieldName = this.sortBy;
            this.sort.order = this.sortOrder;
        },

        async mounted() {
            this.mapColumns();

            await this.mapDataToRows();
        },

        watch: {

            data() {
                if (this.usesLocalData) {
                    this.mapDataToRows();
                }
            },
        },

        computed: {
            fullTableClass() {
                return classList('', this.tableClass);
            },


            ariaCaption() {
                if (this.sort.fieldName === '') {
                    return 'Table not sorted';
                }

                return `Table sorted by ${this.sort.fieldName} ` +
                    (this.sort.order === 'asc' ? '(ascending)' : '(descending)');
            },

            usesLocalData() {
                return isArray(this.data);
            },

            displayedRows() {
                return this.rows;
            },

        },

        methods: {
            async mapDataToRows() {
                const data = this.data;

                let rowId = 0;

                this.rows = data
                    .map(rowData => {
                        rowData.vueTableComponentInternalRowId = rowId++;
                        return rowData;
                    })
                    .map(rowData => new Row(rowData, this.columns));
            },

            mapColumns() {
                const columnComponents = this.$slots.default.filter(
                    column => column.componentInstance
                );

                this.columns = columnComponents.map(
                    column => new Column(column.componentInstance)
                );
            },

            columnHeaderClick(column) {

                if (this.sort.fieldName !== column.field) {
                    this.sort.fieldName = column.field;
                    this.sort.order = 'asc';
                } else {
                    this.sort.order = (this.sort.order === 'asc' ? 'desc' : 'asc');
                }

                this.$emit("sort", this.sort.fieldName, this.sort.order);
            },

            checkboxChanged(signal) {

                const checkedItems = [];

                if(signal){
                    const data = this.data;
                    const keyField = this.keyField;

                    data.forEach(function(item){
                        checkedItems.push(item[keyField]);
                    });
                }

                this.$emit("mark-all", checkedItems);
            },

            async refresh() {
                await this.mapDataToRows();
            },

            rowClicked(data){
                this.$emit("row-clicked", data);
            },

        },
    };
</script>
