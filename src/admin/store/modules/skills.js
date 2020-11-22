export default {
    namespaced: true,
    actions: {
        async add({ commit }, skill) {
            try {
                const resp = await this.$axios.post('/skills', skill);
                commit('categories/ADD_SKILL', resp.data, { root: true });
            } catch (error) {
                throw new Error('При сохранении возникла ошибка');
            }
        },
        async remove({ commit }, skill) {
            try {
                const resp = await this.$axios.delete(`/skills/${skill.id}`);
                commit('categories/REMOVE_SKILL', skill, { root: true });
            } catch (error) {
                throw new Error('При удалении записи возникла ошибка');
            }
        },
        async edit({ commit }, skill) {
            try {
                const { data } = await this.$axios.post(`/skills/${skill.id}`, skill);
                commit('categories/EDIT_SKILL', data.skill, { root: true });
            } catch (error) {
                throw new Error('При редактировании записи возникла ошибка');
            }
        },
    }
}