import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#607d8b',
                secondary: '#ff5722',
                accent: '#ff9800',
                error: '#f44336',
                warning: '#ffc107',
                info: '#03a9f4',
                success: '#8bc34a'
            },
        },
    },
});

