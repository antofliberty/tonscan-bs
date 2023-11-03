<template>
  <transition name="fade">
    <div v-if="value" class="t-modal">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TModal",
  props: {
    value: {
      type: Boolean
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    data() {
      return {

      }
    },
    methods: {
      closeModal() {
        this.$emit('input', false);
      },
    },
    computed: {
      modalStyles() {
        return {

        }
      }
    },
    watch: {
      value(newValue) {
        console.log(newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .t-modal {
      position: fixed;
      z-index: 201;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
  }


</style>
