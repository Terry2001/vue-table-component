<template>
    <div class="row">
        <div class="table-container">
            <table :class="fullTableClass">
                <thead>
                <tr>
                    <table-column-header
                            @click="changeSorting"
                            v-for="column in columns"
                            :key="column.show"
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
                ></table-row>
                </tbody>
            </table>
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
            TableRow,
        },

        props: {
            data: { default: () => [], type: [Array, Function] },

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

        async mounted() {
            this.mapColumns();

            await this.mapDataToRows();
        },

        computed: {
            fullTableClass() {
                return classList('', this.tableClass);
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
                const data = this.usesLocalData
                    ? this.prepareLocalData()
                    : await this.fetchServerData();

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

                columnComponents.forEach(column => {
                    Object.keys(this.$options.props).forEach(
                        prop => this.$watch(prop, () => this.mapColumns())
                    );
                });

            },
            prepareLocalData() {
                this.pagination = null;

                return this.data;
            },
            async fetchServerData() {
                return null;
            },
        },

    };
</script>
