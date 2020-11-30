import tooltipHelper from '../../helpers/tooltipHelper';

export default {
    namespaced: true,
    state: {
        data: [],
        editMode: false,
    },
    mutations: {
        'ADD_REVIEW': (state, review) => {
            state.data.push(review);
        },
        'SET_REVIEWS': (state, reviews) => {
            state.data = reviews;
        },
        'DELETE_REVIEW': (state, rid) => {
            state.data = state.data.filter(review => review.id !== rid);
        },
        'UPDATE_REVIEW': (state, updatedReview) => {
            state.data = state.data.map(review => {
                if (review.id === updatedReview.id) {
                    return updatedReview;
                }
                return review;
            });
        },
        'SET_EDIT_MODE': (state, mode) => ( state.editMode = mode),
    },
    actions: {
        async add(store, review) {
            const formData = new FormData();

            delete review.preview;

            Object.keys(review).forEach(item => {
                formData.append(item, review[item]);
            });

            try {
                const response = await this.$axios.post('/reviews', formData);
                store.commit('ADD_REVIEW', response.data);
                tooltipHelper(store, 'Отзыв успешно добавлен', true);
            } catch(err) {
                tooltipHelper(store, 'При добавлении отзыва возникла ошибка');
                throw new Error(err.message);
            }
        },
        async fetch(store) {
            const uid = store.rootState.user.user.id;

            try {
                const resp = await this.$axios.get(`/reviews/${uid}`);
                store.commit('SET_REVIEWS', resp.data);
            } catch (err) {
                console.log(err);
            }
        },
        async delete(store, rid) {
            try {
                await this.$axios.delete(`/reviews/${rid}`);
                store.commit('DELETE_REVIEW', rid);
                tooltipHelper(store, 'Отзыв успешно удален', true);
            } catch(err) {
                tooltipHelper(store, 'При удалении отзыва возникла ошибка');
                throw new Error(err.message);
            }
        },
        async edit(store, review) {
            const formData = new FormData();

            delete review.preview;

            Object.keys(review).forEach(item => {
                formData.append(item, review[item]);
            });

            try {
                const response = await this.$axios.post(`/reviews/${review.id}`, formData);
                store.commit('UPDATE_REVIEW', response.data.review);
                tooltipHelper(store, 'Отзыв успешно обновлен', true);
            } catch(err) {
                tooltipHelper(store, 'При обновлении отзыва возникла ошибка');
                throw new Error(err.message);
            }
        },
        setMode(store, mode) {
            store.commit('SET_EDIT_MODE', mode);
        }
    }
}