<template>
    <t-menu @select="menuSelectMethod" :items="currentMenuItems" :list="isList"></t-menu>
</template>

<script>
import IconLanguage from "@img/icons/tonscan/language.svg"
import IconCurrency from "@img/icons/tonscan/currency.svg"
import {mapMutations} from "vuex";

export default {
  name: "SettingsLocalization",
  data() {
    return {
      isList: false,
      currentMenuItems: [],
      currentMenu: null,
      menus: [
        {
          name: 'language',
          prop: () => this.localizationMenu
        },
        {
          name: 'currency',
          prop: () => this.currenciesMenu
        }
      ],
      menuEntered: false
    }
  },
  methods: {
    ...mapMutations({
      updateLocaleMutation: 'updateLocale'
    }),
    selectMenu(value) {
      this.menuEntered = true;
      this.isList = true;
      if (value === 'language') {
        this.currentMenuItems = this.languageMenu
      }
      if (value === 'currency') {
        this.currentMenuItems = this.currenciesMenu
      }
      this.currentMenu = value;
      this.$emit('enterMenu', value)
    },
    selectItem(value) {
      console.log(this.currentMenu)
      if (this.currentMenu === 'language') {
        console.log(value)
        this.updateLocaleMutation(value)

      }
      if (this.currentMenu === 'currency') {

      }

    },
    goBack() {
      this.menuEntered = false;
      this.currentMenuItems = this.localizationMenu;
      this.isList = false;
      this.$emit('resetMenu')
    }
  },
  computed: {
    menuSelectMethod() {
      return this.menuEntered === true ? this.selectItem : this.selectMenu
    },
    localizationMenu() {
      return [
        {
          name: this.$t('settings.localization.language'),
          value: 'language',
          icon: IconLanguage
        },
        {
          name: this.$t('settings.localization.currency'),
          value: 'currency',
          icon: IconCurrency
        },
      ]
    },
    currenciesMenu() {
      return [
        {
          name: this.$t('settings.localization.currencies.usd'),
          value: 'usd'
        },
        {
          name: this.$t('settings.localization.currencies.rub'),
          value: 'rub'
        },
        {
          name: this.$t('settings.localization.currencies.eur'),
          value: 'eur'
        },
        {
          name: this.$t('settings.localization.currencies.krw'),
          value: 'krw'
        },
        {
          name: this.$t('settings.localization.currencies.cny'),
          value: 'cny'
        },
      ]
    },
    languageMenu() {
      return [
        {
          name: this.$t('settings.localization.languages.en'),
          value: 'ru'
        },
        {
          name: this.$t('settings.localization.languages.ru'),
          value: 'en'
        },
      ]
    },
  },
  beforeMount() {
    this.currentMenuItems = this.localizationMenu
    console.log(this.currentMenu)
  }
}
</script>

<style lang="scss" scoped>

</style>
