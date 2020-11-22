<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          @input="changeValue($event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          :errorMessage="validation.firstError('value')"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    'value': value => {
      return Validator.value(value).required('Не может быть пустым');
    },
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    blocked: Boolean,
    editModeByDefault: Boolean,
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
    };
  },
  methods: {
    changeValue(data) {
      this.$emit('input', data);
    },
    async onApprove() {
      if (!(await this.$validate())) return;

      if (this.title.trim() !== this.value.trim()) {
        this.$emit("approve", this.value);
      }

      this.editmode = false;
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>