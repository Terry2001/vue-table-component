import TableComponent from './components/TableComponent';
import TableColumn from './components/TableColumn';
import { mergeSettings } from './settings';

export default {
    install(Vue) {
        Vue.component('table-component', TableComponent);
        Vue.component('table-column', TableColumn);
    },

    settings(settings) {
        mergeSettings(settings);
    },
};

export { TableComponent, TableColumn };

export function install(Vue, options) {
    Vue.component('table-component', TableComponent);
    Vue.component('table-column', TableColumn);
}

if (typeof window !== 'undefined' && window['Vue']) {
    window['Vue'].use(install);
}
