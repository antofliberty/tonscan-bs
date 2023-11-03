<template>
  <div
    class="container"
    :class="{ fluid }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TContainer",
  props: {
    fluid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .fluid {
    max-width: 100%;
  }
</style>
