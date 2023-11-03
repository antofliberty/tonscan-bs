<template>
    <section>
        <app-header-bar/>

        <main class="content">
            <router-view/>
        </main>

      <settings-bottom-sheet v-if="screenSizes.isSmallScreen" v-model="settingsBottomSheetShow"></settings-bottom-sheet>
      <settings-modal v-else v-model="settingsModalShow"></settings-modal>
<!--      <settings-bottom-sheet v-if="screenSizes.isSmallScreen" v-model="settingsBottomSheetShow"></settings-bottom-sheet>-->

<!--        <ui-modal align-top v-bind:isOpen.sync="settingsModalVisible">-->
<!--            <template v-slot:header>{{$t('settings.title')}}</template>-->
<!--            <ui-settings/>-->
<!--        </ui-modal>-->

        <toast-container/>
    </section>
</template>

<script>
import ToastContainer from '~/components/UiToastContainer.vue';
import AppHeaderBar from '~/components/AppHeaderBar.vue';
import UiSettings from '~/components/settings/Settings.vue';
import SettingsBottomSheet from "~/components/bottom-sheets/SettingsBottomSheet.vue";
import SettingsModal from "~/components/settings-v2/SettingsModal.vue";

export default {

    data() {
        return {
            settingsBottomSheetShow: false,
          settingsModalShow: false,
        };
    },

    created() {
        this.$bus.$on('app:open-settings-modal', () => {
            this.settingsModalShow = true;
            this.settingsBottomSheetShow = true;
        });
    },

    beforeDestroy() {
        this.$bus.$off('app:open-settings-modal');
    },

    metaInfo() {
        return {
            // Add alternate lang links to every page:
            // @see https://developers.google.com/search/docs/specialty/international/localized-versions
            link: this.$i18n.availableLocales.map((lang) => Object.freeze({
                rel: 'alternate',
                hreflang: lang,
                href: this.$localizedUrl(lang),
            })),
        };
    },

    components: {SettingsModal, SettingsBottomSheet, ToastContainer, AppHeaderBar, UiSettings },
};
</script>
