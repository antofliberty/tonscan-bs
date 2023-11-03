<template>
  <t-modal v-model="isShow">
    <div class="t-modal-card">
      <div class="t-modal-card__header">
        <div class="t-modal-card__left">
          <slot name="left"></slot>
        </div>
        <div class="t-modal-card__header-title">
          <slot name="title"></slot>
        </div>
        <div class="t-modal-card__right">
          <slot name="right"></slot>
        </div>
      </div>
      <t-delimiter></t-delimiter>
      <div class="t-modal-card__content">
        <slot></slot>
      </div>
    </div>
  </t-modal>
</template>

<script>
export default {
  name: "TModalCard",
  props: {
    value: {
      type: Boolean
    },
  },
  data() {
    return {
      isShow: false
    }
  },
  watch: {
    isShow() {
      this.$emit('input', this.isShow)
    }
  },
  beforeMount() {
    this.isShow = this.value
  }
}
</script>

<style lang="scss" scoped>

$header-padding: 20px;

.t-modal-card {
  color: var(--body-text-color);
  background: var(--card-background);
  border-radius: 16px;
  position: relative;
  width: 480px;
  display: flex;
  flex-direction: column;

  &__header {
    padding: $header-padding;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & div {
      flex: 1;
    }

    &-title {
      font-size: 20px;
      text-transform: uppercase;
      font-weight: 500;
      text-align: center;
    }
  }

  &__content {
    padding: $header-padding * 2;
  }

}

</style>
