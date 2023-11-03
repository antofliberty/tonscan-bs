<template>
  <div class="t-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TRow",
  props: {
    gap: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: `-${this.gap / 2}px`,
        marginRight: `-${this.gap / 2}px`
      };
    }
  },
  provide() {
    return {
      gap: this.gap
    };
  }
}
</script>

<style scoped lang="scss">

.t-row {
  display: flex;
  flex-wrap: wrap;
  //flex: 1 1 auto;
  //gap: 20px;
}

</style>
