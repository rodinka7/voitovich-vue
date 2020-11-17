<template>
  <div class="app-container">
    <headline title="Панель управления">
      <user />
    </headline>
    <navigation />

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
        <ul class="skills">
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
              @edit-skill="editSkill($event, category.id)"
              @remove-skill="removeSkill($event, category.id)"
              @add-skill="addSkill($event, category.id)"
              @remove="removeCategory(category.id)"
              @approve="approveTitle($event, category.id)"
            />
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import headline from './components/headline';
  import user from './components/user';
  import navigation from './components/navigation';
  import button from './components/button';
  import category from './components/category';

  export default {
    data() {
      return {
        categories: [],
        emptyCatisShown: false,
      }
    },
    components: {
      headline,
      user,
      navigation,
      iconedBtn: button,
      category,
    },
    methods: {
      addCategory(data) {
        if (!data) return;

        this.categories.unshift({
          id: (Math.random() * 100).toFixed(),
          category: data,
          skills: [],
        });

        this.emptyCatisShown = false;
      },
      approveTitle(data, cid) {
        const category = this.categories.find(item => item.id === cid);
        if (!category) return;

        category.category = data;
      },
      removeCategory(data) {
        const index = this.categories.reduce((prev, item, index) => {
          if (item.id === data) {
            return index;
          }

          return prev;
        }, 0);

        this.categories.splice(index, 1);
      },
      addSkill(data, cid) {
        const category = this.categories.find(item => item.id === cid);
        if (!category) return;

        const { title, percent } = data;
        const id = (Math.random() * 100).toFixed();

        category.skills.push({
            id,
            title,
            percent,
        });
      },
      editSkill(data, cid) {
        const category = this.categories.find(item => item.id === cid);
        if (!category) return;

        const skill = category.skills.find(item => item.id === data.id);

        if (skill) {
          skill.title = data.title;
          skill.percent = data.percent;
        }
      },
      removeSkill(sid, cid) {
        const category = this.categories.find(item => item.id === cid);
        if (!category) return;

        const index = category.skills.reduce((prev, current, ind) => {
          if (current.id === sid) {
            return ind;
          }

          return prev;
        }, 0);

        category.skills.splice(index, 1);
      }
    },
    created() {
      this.categories = require('./data/categories');
    },
  }
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>
<style scoped src="./app.pcss"></style>