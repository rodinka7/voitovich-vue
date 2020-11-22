<template>
  <div class="about-page-component">
    <div class="page-content">
      <div class="container">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-btn
            type="iconed"
            title="Добавить группу"
            @click="emptyCatisShown = true"
            v-if="!emptyCatisShown"
          />
        </div>

        <ul class="skills" v-if="categoryMode">
          <li class="item" v-if="emptyCatisShown">
            <category
              empty
              @remove="emptyCatisShown = false"
              @approve="addCategory($event)"
            />
          </li>
          <li
            class="item"
            v-for="category in categories"
            :key="category.id"
          >
            <category
              :title="category.category"
              :skills="category.skills"
              @edit-skill="editSkill($event)"
              @remove-skill="removeSkill($event)"
              @add-skill="addSkill($event, category.id)"
              @remove="removeCategory(category.id)"
              @approve="editCategory($event, category.id)"
            />
          </li>
        </ul>

        <div class="container" v-else>
          Loading ...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import button from '../../components/button';
  import category from '../../components/category';
  import { mapActions, mapState } from 'vuex';

  export default {
    data() {
      return {
        emptyCatisShown: false,
      }
    },
    components: {
      iconedBtn: button,
      category,
    },
    computed: {
      ...mapState('categories', {
        categories: state => state.data,
      }),
      categoryMode() {
        return this.categories.length || this.emptyCatisShown;
      }
    },
    methods: {
      ...mapActions({
        createCategoryAction: 'categories/create',
        editCategoryAction: 'categories/edit',
        removeCategoryAction: 'categories/remove',
        fetchCategoriesAction: 'categories/fetch',
        addSkillAction: 'skills/add',
        editSkillAction: 'skills/edit',
        removeSkillAction: 'skills/remove',
        showTooltip: 'tooltips/show',
      }),
      async addCategory(data) {
        if (!data) return;
        try {
          await this.createCategoryAction(data);
          this.emptyCatisShown = false;

          this.showTooltip({
            text: 'Категория успешно добавлена',
            type: 'success',
          });
        } catch (e) {
          this.showTooltip({
            text: e.message,
            type: 'error',
          });
        }
      },
      async editCategory(data, cid) {
        try {
          await this.editCategoryAction({
            title: data,
            cid,
          });

          this.showTooltip({
            text: 'Категория успешно обновлена',
            type: 'success',
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: 'error',
          });
        }
      },
      async removeCategory(cid) {
        try {
          await this.removeCategoryAction(cid);

          this.showTooltip({
            text: 'Категория успешно удалена',
            type: 'success',
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: 'error',
          });
        }
      },
      async addSkill(data, cid) {
        try {
          await this.addSkillAction({
            ...data,
            category: cid,
          });

          data.title = '';
          data.percent = '';

          this.showTooltip({
            text: 'Навык успешно добавлен',
            type: 'success',
          });
        } catch (e) {
          this.showTooltip({
            text: e.message,
            type: 'error',
          });
        }
      },
      async editSkill(data) {
        try {
          await this.editSkillAction(data);
          data.editMode = false;

          this.showTooltip({
            text: 'Навык успешно обновлен',
            type: 'success',
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: 'error',
          })
        }
      },
      async removeSkill(data) {
        try {
          await this.removeSkillAction(data);
          this.showTooltip({
            text: 'Навык успешно удален',
            type: 'success',
          });
        } catch (error) {
          this.showTooltip({
            text: error.message,
            type: 'error',
          })
        }
      }
    },
    created() {
      this.fetchCategoriesAction();
    },
  }
</script>

<style scoped src="./about.pcss"></style>