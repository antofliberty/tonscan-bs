<template>
  <t-bottom-sheet
      @hide="hide"
      ref="settingsSheet"
      :title="$t('settings.title')"
      class="settings-sheet"
  >
    <template v-slot:header-middle>
      <div class="settings-sheet__title">{{ $t('settings.title') }}</div>
    </template>
    <template v-slot:header-right>
      <div class="settings-sheet__close" @click="close">{{ $t('settings.close') }}</div>
    </template>

    <ui-settings></ui-settings>

  </t-bottom-sheet>
</template>

<script>
import TBottomSheet from "~/framework/TBottomSheet.vue";
import UiSettings from '~/components/settings/Settings.vue';

export default {
  name: "SettingsBottomSheet",
  components: {
    TBottomSheet,
    UiSettings
  },
  props: {
    value: {
      type: Boolean,
    }
  },
  methods: {
    close() {
      this.$refs.settingsSheet.hideBottomSheet()
      console.log('close')
      this.$emit('input', false)
    },
    hide() {
      this.$emit('input', false)
    }
  },
  watch: {
    value() {
      if (this.value) {
        this.$refs.settingsSheet.showBottomSheet()
      }
    }
  },
}
</script>

<style lang="scss" scoped>

  .settings-sheet {

    &__title {
      color: var(--body-text-color);
      font-weight: 600;
      font-size: 18px;
    }

    //&__reset-btn {
    //  font-size: 18px;
    //  color: var(--body-muted-text-color);
    //}
    //

    &__close {
      color: var(--blue-bright);
      padding-right: 4px;
    }

  }

</style>
