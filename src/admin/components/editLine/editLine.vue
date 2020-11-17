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
        ></app-input>

        <alert :isShown="showAlert"/>
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
export default {
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
      showAlert: false,
    };
  },
  methods: {
    changeValue(data) {
      this.showAlert = false;
      this.$emit('input', data);
    },
    onApprove() {
      if (!this.value.trim()) {
        this.showAlert = true;
        return;
      }

      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
        this.editmode = false;
      }
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),
    alert: () => import("components/alert"),
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>