<template>
  <div
    :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input
        placeholder="Новый навык"
        v-model="newSkill.title"
        @input="changeValue"
      />
      <alert :isShown="showInputAlert" />
    </div>
    <div class="percent">
      <app-input
        type="number"
        min="0"
        max="100"
        maxlength="3"
        v-model="newSkill.percent"
        @input="changeValue"
      />
      <alert :isShown="showPercentAlert" />
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
import alert from '../alert';

export default {
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
        id: 0,
        title: '',
        percent: '',
      },
      showPercentAlert: false,
      showInputAlert: false,
    }
  },
  methods: {
    addSkill() {
      if (!this.newSkill.title.trim()) {
        this.showInputAlert = true;
        return;
      }

      if (!this.newSkill.percent.trim()) {
        this.showPercentAlert = true;
        return;
      }

      this.$emit('add-skill', this.newSkill);

      this.newSkill = {
        id: 0,
        title: '',
        percent: '',
      }
    },
    changeValue() {
      this.showInputAlert = false;
      this.showPercentAlert = false;
    }
  }
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>