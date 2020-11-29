import axios from 'axios';

export default {
    namespaced: true,
    state: {
        user: {},
    },
    mutations: {
        'SET_USER': (state, user) => ( state.user = user ),
        'CLEAR_USER': (state) => ( state.user = {} ),
    },
    getters: {
        isUserLoggedIn: (state) => {
            const user = state.user;
            const isEmpty = Object.keys(user).length === 0 && user.constructor === Object;

            return isEmpty === false;
        },
    },
    actions: {
        async login({ commit }, user) {
            commit('SET_USER', user);
        },
        async logout({ commit }) {
            await axios.post('/logout');

            localStorage.removeItem('token');
            commit('CLEAR_USER');

            location.reload();
        },
    }
}