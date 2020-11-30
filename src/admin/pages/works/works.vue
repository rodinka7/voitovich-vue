<template>
    <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="header">
          <div class="title">
            Блок "Работы"
          </div>
        </div>
        <div class="form" v-if="editMode">
          <app-form :work="currWork"/>
        </div>
        <ul class="cards">
          <li
            class="item empty-card"
            @click="addWork"
          >
            <div class="circle"></div>
            <div class="card-title">Добавить работу</div>
          </li>
          <li
            :class="['item', {editing: work.editMode}]"
            v-for="work in works"
            :key="work.id"
        >
            <work-card
              :work="work"
              @edit="editWork($event)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from '../../components/appForm';
import workCard from '../../components/workCard';
import { mapState, mapActions } from 'vuex';
import config from '../../../../env.paths.json';

export default {
    data() {
      return {
        currWork: {
          title: "",
          link: "",
          description: "",
          techs: "",
          photo: {},
          preview: "",
        },
      }
    },
    components: {
        appForm,
        workCard,
    },
    computed: {
      ...mapState('works', {
        works: (state) => state.data,
        editMode: (state) => state.editMode,
      }),
    },
    methods: {
      ...mapActions({
        fetchWorks: 'works/fetch',
        setMode: 'works/setMode',
      }),
      editWork(work) {
        this.currWork = {...work};
        this.currWork.preview = `${config.BASE_URL}/${this.currWork.photo}`;
        this.setMode(true);
      },
      addWork() {
        this.currWork = {
          title: "",
          link: "",
          description: "",
          techs: "",
          photo: {},
          preview: "",
        };
        this.setMode(true);
      },
    },
    created() {
      this.fetchWorks();
    }
}
</script>

<style lang="postcss" scoped src="./works.pcss">/style>