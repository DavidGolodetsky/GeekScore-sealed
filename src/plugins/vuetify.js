import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#562e42',
                secondary: '#ff9800',
                accent: '#ffb84d',
                error: '#f44336',
                warning: '#ffc107',
                info: '#03a9f4',
                success: '#8bc34a'
            },
        },
    },
});

