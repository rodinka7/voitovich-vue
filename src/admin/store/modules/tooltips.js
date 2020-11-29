export default {
    namespaced: true,
    state: {
        isShown: false,
        text: '',
        type: 'success',
        timeOut: null,
    },
    mutations: {
        'SET_TOOLTIP': (state, tooltip) => {
            state.isShown = tooltip.isShown;
            state.text = tooltip.text;
            state.type = tooltip.type;
        }
    },
    actions: {
        show: ({ commit, dispatch, state }, tooltip) => {
            commit('SET_TOOLTIP', {
                isShown: true,
                text: tooltip.text,
                type: tooltip.type,
            });

            if (state.timeOut) {
                clearTimeout(state.timeOut);
            }

            state.timeOut = setTimeout(() => {
                clearTimeout(state.timeOut);
                dispatch('hide');
            }, 3000);
        },
        hide: ({ commit, state  }) => {
            clearTimeout(state.timeOut);

            commit('SET_TOOLTIP', {
                ...state,
                isShown: false,
            });
        },
    }
};