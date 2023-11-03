<template>
  <div class="settings-section">
    <div class="settings-section__title" v-if="title">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SettingsSection",
  props: {
    title: {
      type: null
    }
  }
}
</script>

<style lang="scss" scoped>

.settings-section {
  &__title {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    color: var(--body-muted-text-color);
    margin-bottom: 16px;
  }
}

</style>
