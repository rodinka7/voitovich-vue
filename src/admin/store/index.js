import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import categories from './modules/categories';
import skills from './modules/skills';
import tooltips from './modules/tooltips';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        categories,
        skills,
        tooltips,
    },
});