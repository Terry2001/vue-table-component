<template>
    <tr :class="trClass" @click="clicked">
        <table-cell
            v-for="column in visibleColumns"
            :row="row"
            :column="column"
        ></table-cell>
    </tr>
</template>

<script>
    import TableCell from './TableCell';

    export default {
        props: ['columns', 'row'],

        components: {
            TableCell,
        },

        computed: {
            visibleColumns() {
                return this.columns.filter(column => ! column.hidden);
            },

            trClass() {
                return this.row.data.trClass;
            },
        },

        methods: {
            clicked() {
                this.$emit('row-clicked', this.row.data);
            },

        },
    };
</script>
