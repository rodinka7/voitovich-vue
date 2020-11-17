<template>
  <div
    :class="['tag', {interactive: interactive}]"
  >
    <span>{{title}}</span>
    <icon
      symbol="cross"
      grayscale
      v-if="interactive"
      class="remove"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import icon from '../icon';

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: {
      type: Boolean,
    }
  },
  components: { icon }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>