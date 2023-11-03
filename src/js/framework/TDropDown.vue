<template>
  <div class="t-dropdown">
    <div v-if="value" class="overlay" @click="toggleDropdown">

    </div>
    <transition name="fade">
      <div v-if="value" class="t-dropdown-menu" :style="passedStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TDropDown",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      passedStyle: ''
    }
  },
  methods: {
    toggleDropdown() {
      this.$emit('input', !this.value);
    },
  },
  // TODO: Refactor styling
  beforeMount() {
    this.passedStyle = this.$vnode.data.staticStyle
  }
};
</script>

<style lang="scss" scoped>
.t-dropdown {
  position: relative;
  margin-top: 8px;
}

.t-dropdown-menu {
  position: absolute;
  // TMP FIX
  // TODO: Refactor styling
  right: 0;
  z-index: 2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
