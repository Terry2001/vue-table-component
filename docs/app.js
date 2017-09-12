import Vue from 'vue';
import { TableColumn, TableComponent } from '../src';

new Vue({
    el: '#app',

    data: {
        rows: [
            { firstName: 'John', lastName: 'Lennon', instrument: 'Guitar', birthday: '04/10/1940', songs: 72 },
            { firstName: 'Paul', lastName: 'McCartney', instrument: 'Bass', birthday: '18/06/1942', songs: 70 },
            { firstName: 'George', lastName: 'Harrison', instrument: 'Guitar', birthday: '25/02/1943', songs: 22 },
            { firstName: 'Ringo', lastName: 'Starr', instrument: 'Drums', birthday: '07/07/1940', songs: 2 },
        ],
    },

    components: {
        TableColumn,
        TableComponent,
    },

    methods: {
        sortChanged(sortBy, sortOrder) {

            //alert(sortBy + '-' + sortOrder);

            this.rows.splice(0, 1);

        },
    },
});
