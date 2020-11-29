import tooltipHelper from '../../helpers/tooltipHelper';

export default {
    namespaced: true,
    state: {
        data: [],
        editMode: false,
    },
    mutations: {
        'ADD_WORK': (state, work) => {
            state.data.push(work);
        },
        'SET_WORKS': (state, works) => {
            state.data = works;
        },
        'DELETE_WORK': (state, wid) => {
            state.data = state.data.filter(work => work.id !== wid);
        },
        'UPDATE_WORK': (state, updatedWork) => {
            state.data = state.data.map(work => {
                if (work.id === updatedWork.id) {
                    return updatedWork;
                }
                return work;
            });
        },
        'SET_EDIT_MODE': (state, mode) => ( state.editMode = mode),
    },
    actions: {
        async add(store, work) {
            const formData = new FormData();

            delete work.preview;

            Object.keys(work).forEach(item => {
                formData.append(item, work[item]);
            });

            try {
                const response = await this.$axios.post('/works', formData);
                store.commit('ADD_WORK', response.data);
                tooltipHelper(store, 'Работа успешно добавлена', true);
            } catch(err) {
                tooltipHelper(store, 'При добавлении работы возникла ошибка');
                throw new Error(err.message);
            }
        },
        async fetch(store) {
            const uid = store.rootState.user.user.id;

            try {
                const resp = await this.$axios.get(`/works/${uid}`);
                store.commit('SET_WORKS', resp.data);
            } catch (err) {
                console.log(err);
            }
        },
        async delete(store, wid) {
            try {
                await this.$axios.delete(`/works/${wid}`);
                store.commit('DELETE_WORK', wid);
                tooltipHelper(store, 'Работа успешно удалена', true);
            } catch(err) {
                tooltipHelper(store, 'При удалении работы возникла ошибка');
                throw new Error(err.message);
            }
        },
        async edit(store, work) {
            const formData = new FormData();

            delete work.preview;

            Object.keys(work).forEach(item => {
                formData.append(item, work[item]);
            });

            try {
                const response = await this.$axios.post(`/works/${work.id}`, formData);
                store.commit('UPDATE_WORK', response.data.work);
                tooltipHelper(store, 'Работа успешно обновлена', true);
            } catch(err) {
                tooltipHelper(store, 'При обновлении работы возникла ошибка');
                throw new Error(err.message);
            }
        },
        setMode(store, mode) {
            store.commit('SET_EDIT_MODE', mode);
        }
    },
}