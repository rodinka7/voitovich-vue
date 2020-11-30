import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import categories from './modules/categories';
import skills from './modules/skills';
import tooltips from './modules/tooltips';
import works from './modules/works';
import reviews from './modules/reviews';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        categories,
        skills,
        works,
        reviews,
        tooltips,
    },
});