import Vue from 'vue';
import VueRouter from 'vue-router';

import header from './components/header';
import about from './pages/about';
import login from './pages/login';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: {
            default: about,
            header,
        },
    },
    {
        path: '/login',
        component: login,
    }
];

export default new VueRouter({routes});