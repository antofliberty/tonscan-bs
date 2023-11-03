<template>
  <div class="settings-body">
    <settings-section
        :title="getSectionTitle('appearance')"
        v-show="currentMenu === null || currentMenu === 'appearance'"
    >
      <settings-appearance></settings-appearance>
    </settings-section>

    <settings-section
        :title="getSectionTitle('localization')"
        v-show="currentMenu === null || currentMenu === 'language' || currentMenu === 'currency'"
    >
      <settings-localization
          ref="settingsLocalization"
          @enterMenu="enterMenu"
          @resetMenu="resetMenu"
      ></settings-localization>
    </settings-section>
  </div>
</template>

<script>
import TModal from "~/framework/TModal.vue";
import SettingsAppearance from "~/components/settings-v2/SettingsAppearance.vue";
import SettingsLocalization from "~/components/settings-v2/SettingsLocalization.vue";
import SettingsSection from "~/components/settings-v2/SettingsSection.vue";

export default {
  name: "SettingsBody",
  components: {
    SettingsSection,
    SettingsLocalization,
    SettingsAppearance,
    TModal,
  },
  props: {
    value: {
      type: Boolean
    },
  },
  data() {
    return {
      isShow: true,
      currentMenu: null
    }
  },
  computed: {
    menus() {
      return {
        language: this.$t('settings.localization.language'),
        currency: this.$t('settings.localization.currency')
      }
    },
    sections() {
      return {
        appearance: this.$t('settings.appearance.title'),
        localization: this.$t('settings.localization.title')
      }
    }
  },
  methods: {
    enterMenu(menu) {
      this.currentMenu = menu;
      this.$emit('menuChange', menu, this.menus[menu])
      // console.log(this.currentMenu === null ? this.sections[title] : null)
    },
    getSectionTitle(title) {
      return this.currentMenu === null ? this.sections[title] : null;
    },
    getSectionVisibility(section) {
      return this.currentMenu === null || this.currentMenu === section;
    },
    goBack() {
      this.currentMenu = null
      this.$refs.settingsLocalization.goBack()
    },
    resetMenu() {

    }
  },
  watch: {
    value(newValue) {
      this.isShow = newValue
    },
  }
}
</script>

<style lang="scss" scoped>

.settings-body {
  display: flex;
  gap: 32px;
  flex-direction: column;
}


</style>
