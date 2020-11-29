import tooltipHelper from '../../helpers/tooltipHelper';

export default {
    namespaced: true,
    actions: {
        async add(store, skill) {
            try {
                const resp = await this.$axios.post('/skills', skill);
                store.commit('categories/ADD_SKILL', resp.data, { root: true });

                tooltipHelper(store, 'Навык успешно добавлен', true);
            } catch (error) {
                tooltipHelper(store, 'При сохранении возникла ошибка');
                throw new Error(error.message);
            }
        },
        async remove(store, skill) {
            try {
                const resp = await this.$axios.delete(`/skills/${skill.id}`);
                store.commit('categories/REMOVE_SKILL', skill, { root: true });
                tooltipHelper(store, 'Навык успешно удален', true);
            } catch (error) {
                tooltipHelper(store, 'При удалении записи возникла ошибка');
                throw new Error(error.message);
            }
        },
        async edit(store, skill) {
            try {
                const { data } = await this.$axios.post(`/skills/${skill.id}`, skill);
                store.commit('categories/EDIT_SKILL', data.skill, { root: true });
                tooltipHelper(store, 'Навык успешно обновлен', true);
            } catch (error) {
                tooltipHelper(store, 'При редактировании записи возникла ошибка');
                throw new Error(error.message);
            }
        },
    }
}