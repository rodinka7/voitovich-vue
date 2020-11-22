export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => ( state.data = categories ),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        EDIT_CATEGORY: (state, updatedCategory) => {
            state.data = state.data.map(category => {
                if (category.id === updatedCategory.id) {
                    category.category = updatedCategory.category;
                }
                return category;
            })
        },
        REMOVE_CATEGORY: (state, cid) => ( state.data = state.data.filter(category => category.id !== cid) ),
        ADD_SKILL: (state, skill) => {
            state.data = state.data.map(category => {
                if (category.id === skill.category) {
                    category.skills.push(skill);
                }

                return category;
            });
        },
        REMOVE_SKILL: (state, skill) => {
            state.data = state.data.map(category => {
                if (category.id === skill.category) {
                    category.skills = category.skills.filter(categorySkill => categorySkill.id !== skill.id);
                }
                return category;
            })
        },
        EDIT_SKILL: (state, skill) => {
            const editSkill = category => {
                category.skills = category.skills.map(categorySkill => categorySkill.id === skill.id ? skill : categorySkill);
            };

            const findCategory = category => {
                if (category.id === skill.category) {
                    editSkill(category);
                }
                return category;
            };

            state.data = state.data.map(findCategory);
        },
    },
    actions: {
        async create(store, title) {
            try {
                const resp = await this.$axios.post('/categories', {title});
                store.commit('ADD_CATEGORY', resp.data);
            } catch (err) {
                throw new Error('При добавлении категории произошла ошибка');
            }
        },
        async fetch({ commit }) {
            const uid = 424;

            try {
                const resp = await this.$axios.get(`/categories/${uid}`);
                commit('SET_CATEGORIES', resp.data);
            } catch (err) {
                console.log(err);
            }
        },
        async edit({ commit }, { title, cid }) {
            try {
                const { data } = await this.$axios.post(`/categories/${cid}`, {title});
                commit('EDIT_CATEGORY', data.category);
            } catch (err) {
                throw new Error('При редактировании категории произошла ошибка');
            }
        },
        async remove(store, cid) {
            try {
                const { data } = await this.$axios.delete(`/categories/${cid}`);
                store.commit('REMOVE_CATEGORY', cid);
            } catch (err) {
                throw new Error('При удалении категории произошла ошибка');
            }
        },
    }
}