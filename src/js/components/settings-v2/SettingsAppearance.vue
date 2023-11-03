<template>
  <t-selector
      class="settings-appearance"
      @select="selectTheme"
      :selected-item="selectedTheme"
      delimiter
      block
      :items="themes"
      height="48px"
  ></t-selector>
</template>

<script>
import IconThemeSystem from "@img/icons/tonscan/settings/system.svg";
import IconThemeLight from "@img/icons/tonscan/settings/light.svg";
import IconThemeDark from "@img/icons/tonscan/settings/dark.svg";

export default {
  name: "SettingsAppearance",
  computed: {
    selectedTheme: {
      get() {
        return this.$store.state.appTheme;
      },

      set(theme) {
        this.$store.commit('updateTheme', theme);
      },
    },
    themes() {
      return [
        {
          name: this.$t('settings.appearance.system'),
          value: 'system',
          icon: IconThemeSystem
        },
        {
          name: this.$t('settings.appearance.light'),
          value: 'light',
          icon: IconThemeLight
        },
        {
          name: this.$t('settings.appearance.dark'),
          value: 'dark',
          icon: IconThemeDark
        }
      ]
    }
  },
  methods: {
    selectTheme(theme) {
      this.selectedTheme = theme;
    }
  }
}
</script>

<style lang="scss" scoped>
  //::v-deep .t-selector__item {
  //  //position: relative;
  //
  //  .t-delimiter {
  //    position: absolute;
  //    height: 32px;
  //    right: 0;
  //  }
  //}

  .settings-appearance {
    background: var(--body-background)!important;

    ::v-deep .t-selector__item {
      padding: 0!important;
    }

    ::v-deep .t-selector__item--selected {


      & .t-selector__item-name, & .t-selector__item-icon {
        color: var(--blue-bright)!important;
      }
    }

    ::v-deep .t-selector__item-name {
      color: var(--body-text-color)!important;
    }

  }

</style>
