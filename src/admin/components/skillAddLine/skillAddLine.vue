<template>
  <div
    :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input
        placeholder="Новый навык"
        v-model="newSkill.title"
        :errorMessage="validation.firstError('newSkill.title')"
      />
    </div>
    <div class="percent">
      <app-input
        type="number"
        min="0"
        max="100"
        maxlength="3"
        v-model="newSkill.percent"
        :errorMessage="validation.firstError('newSkill.percent')"
      />
    </div>
    <div class="button">
      <round-button
        type="round"
        @click="addSkill()"
      />
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ ValidatorMixin ],
  validators: {
    'newSkill.title': value => {
      return Validator.value(value).required('Не может быть пустым');
    },
    'newSkill.percent': value => {
      return Validator.value(value)
        .integer('Должно быть числом')
        .between(0, 100, 'Некорректное значение')
        .required('Не может быть пустым');
    },
  },
  props: {
    blocked: Boolean,
  },
  components: {
    appInput: input,
    roundButton: button,
    alert,
  },
  data() {
    return {
      newSkill: {
        title: '',
        percent: '',
      },
    }
  },
  methods: {
    async addSkill() {
      if (!(await this.$validate())) return;

      this.$emit('add-skill', this.newSkill);
    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>