<template>
  <div class="t-col" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>

const screenSizePropValidator = (value) => {
  return (value > 0 && value <= 12) || value === 'hidden';
}

export default {
  props: {
    /**
     * 'cols' prop stands for desktop screen size
     * 'cols' prop is a fallback if mobile prop or tablet prop are not passed
     * */
    cols: {
      type: [Number, String],
      required: true,
      default: 12,
      validator: screenSizePropValidator,
    },
    mobile: {
      type: [Number, String],
      default: 12,
      required: false,
      validator: screenSizePropValidator,
    },
    tablet: {
      type: [Number, String],
      default: 12,
      required: false,
      validator: screenSizePropValidator
    },
    name: {
      type: String
    }
  },
  inject: ['gap'],
  data() {
    return {
      colStyle: {}
    }
  },
  methods: {
    setColStyle(screenSizes) {

      const mobileHidden = this.mobile === 'hidden' && screenSizes.isSmallScreen
      const tabletHidden = this.tablet === 'hidden' && screenSizes.isMediumScreen
      const desktopHidden = this.cols === 'hidden' && screenSizes.isLargeScreen

      // Hide col on certain screen size
      if (mobileHidden) {
        this.hideCol();
        return;
      }

      if (tabletHidden) {
        this.hideCol();
        return;
      }

      if (desktopHidden) {
        this.hideCol();
        return;
      }

      let numberOfCols = this.cols

      if (screenSizes.isSmallScreen) {
        numberOfCols = this.mobile
      } else if (screenSizes.isMediumScreen) {
        numberOfCols = this.tablet
      }

      const percentage = (numberOfCols / 12) * 100;

      this.colStyle = {
        flex: `0 0 ${percentage}%`,
        maxWidth: `${percentage}%`,
        paddingLeft: `${this.gap / 2}px`,
        paddingRight: `${this.gap / 2}px`
      };
    },
    hideCol() {
      this.colStyle = {
        display: 'none'
      }
    },
  },
  watch: {
    '$root.screenSizes': {
      handler (newVal) {
        const frozenScreenSizes = { ...newVal }
        this.setColStyle(frozenScreenSizes);
      },
      deep: true
    },
    '$props': {
      handler() {
        const frozenScreenSizes = {...this.screenSizes}
        this.setColStyle(frozenScreenSizes)
      },
      deep: true
    }
  },
  mounted() {
    const frozenScreenSizes = {...this.screenSizes}
    this.setColStyle(frozenScreenSizes);
  },
};
</script>

<style lang="scss" scoped>
.t-col {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  box-sizing: border-box;

  //flex-basis: 0;
  //flex-grow: 1;
  //max-width: 100%;
}
//
//@media screen and (max-width: 480px) {
//
//}
</style>
