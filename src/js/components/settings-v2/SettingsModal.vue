<template>
  <t-modal-card v-model="isShow" @close="$emit('input', false)">
    <template v-slot:left>
      <div v-if="currentMenu !== null">
        <div class="settings-modal__back" @click="goBack">
          <icon-back class="icon-back"/>
          Back
        </div>
      </div>
    </template>
    <template v-slot:title>{{ title }}</template>
    <template v-slot:right>
      <icon-close class="icon-close" @click="isShow = false"/>
    </template>

    <settings-body ref="settingsBody" @menuChange="menuChange"></settings-body>
  </t-modal-card>
</template>

<script>
import SettingsBody from "~/components/settings-v2/SettingsBody.vue";
import IconClose from "@primer/octicons/build/svg/x-24.svg";
import IconBack from "@img/icons/tonscan/arrow-back.svg";

export default {
  name: "SettingsModal",
  components: {
    SettingsBody,
    IconClose,
    IconBack
  },
  data() {
    return {
      isShow: true,
      title: this.$t('settings.title'),
      currentMenu: null
    }
  },
  methods: {
    menuChange(menu, title) {
      this.title = title;
      this.currentMenu = menu;
    },
    goBack() {
      this.currentMenu = null;
      this.title = this.$t('settings.title');
      this.$refs.settingsBody.goBack();
    }
  }
}
</script>

<style lang="scss" scoped>

.settings-modal {
  &__back {
    cursor: pointer;
    color: var(--blue-bright);
  }
}

.icon-close {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    max-height: 24px;
    height: 24px;
    width: 24px;
    fill: var(--body-text-color);
}

.icon-back {
  margin-right: 5px;
}


</style>
