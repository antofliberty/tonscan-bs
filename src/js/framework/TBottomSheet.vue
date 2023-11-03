<template>
  <div
      class="bottom-sheet"
      ref="bottomSheet"
      :class="{
        'show': isShow,
        'fullscreen': isFullScreen,
        'dragging': isDragging
      }"
  >
    <div class="sheet-overlay" @click="hideBottomSheet()" v-if="isShow"></div>
    <div
        class="sheet-content"
        ref="sheetContent"
    >
      <div class="sheet-content__wrapper" ref="sheetContentWrapper">
        <div
            @touchstart="dragStart"
            @touchmove="dragging"
            @touchend="dragStop"
            class="draggable-place"
        >
          <div class="bottom-sheet__header">
            <div class="bottom-sheet__header-left">
              <slot name="header-left"></slot>
            </div>
            <div class="bottom-sheet__header-middle">
              <slot name="header-middle"></slot>
            </div>
            <div class="bottom-sheet__header-right">
              <slot name="header-right"></slot>
            </div>
          </div>
          <t-delimiter></t-delimiter>
          <div class="bottom-sheet__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TBottomSheet",
  props: {
    value: {
      type: Boolean,
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      startY: 0,
      isDragging: false,
      startHeight: -100,
      isShow: false,
      isFullScreen: false,
      contentHeight: 0
    };
  },
  methods: {
    getHeightInVH() {
      const element = this.$refs.sheetContentWrapper;
      const elementHeight = element.clientHeight; // Height in pixels
      const viewportHeight = window.innerHeight; // Viewport height in pixels

      return (elementHeight / viewportHeight) * 100;
    },
    showBottomSheet() {
      document.body.style.overflowY = "hidden";
      //TODO: Calculate height of content if it's less than 90vh
      console.log(this.getHeightInVH())
      this.updateSheetHeight(65);
      this.isShow = true;
      // this.$emit('update:value', true)
    },

    hideBottomSheet() {
      console.log('hide')
      this.isShow = false;
      this.$emit('hide')
      document.body.style.overflowY = "auto";
    },

    dragStart(e) {
      this.isDragging = true;
      this.startY = e.pageY || e.touches?.[0].pageY;
      this.startHeight = parseInt(this.$refs.sheetContent.style.height);
    },

    // Calculating new height of sheetContent and pass it to update method
    dragging (e) {
      if(!this.isDragging) return;
      const delta = this.startY - (e.pageY || e.touches?.[0].pageY);
      const newHeight = this.startHeight + delta / window.innerHeight * 100;
      this.updateSheetHeight(newHeight);
    },

    // Taking solution what to do when stop dragging
    dragStop() {
      this.isDragging = false;
      const sheetHeight = parseInt(this.$refs.sheetContent.style.height);
      sheetHeight < 25 ? this.hideBottomSheet() : sheetHeight > 75 ? this.updateSheetHeight(90) : this.updateSheetHeight(65);
    },

    // Setting new height for sheetContent
    updateSheetHeight (height) {
      console.log(height)
      this.$refs.sheetContent.style.height = `${height}vh`; //updates the height of the sheet content
      // Toggles the fullscreen class to bottomSheet if the height is equal to 100
      this.isFullScreen = height === 100
    },
    onResize() {
      this.hideBottomSheet()
    }
  },
  mounted() {
    this.contentHeight  = this.getHeightInVH()
  },
  beforeMount() {
    window.addEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss">

// Element that can be used to drag our sheet
.draggable-place {
  //padding: 1.5rem
}

.bottom-sheet {
  transition: 0.1s ease-in-out;

  &__header {
    display: flex;
    padding: 20px 16px;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &-middle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &-right {
      //
    }

    &-left {
      //
    }
  }

  &__content {
    padding: 4px 0 0 0;
    overflow-y: scroll;
  }
}

.bottom-sheet .show {
  //pointer-events: auto;
}

.sheet-content {
  //max-width: 400px;
  //margin: 0 auto;
  touch-action: none;
  //padding: 0 1.5rem;
  z-index: 9999;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--card-background);
  border-radius: 1.5rem 1.5rem 0 0;
  height: 90vh;
  transition: 0.2s ease-in-out;
  transform: translateY(100%);
  will-change: height;
}

.sheet-content__wrapper {
  max-height: fit-content;
}

.bottom-sheet.show .sheet-content{
  transform: translateY(0%);
  //will-change: transform;
}
.bottom-sheet.dragging .sheet-content {
  transition: none;
}

// Overlay to detect click outside of our sheet
.bottom-sheet .sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.sheet-overlay {
  background: #000;
  opacity: 0.2;
  z-index: 201;
}

.drag-icon {
  margin: 0 auto 1rem auto;
  background: #777777;
  border-radius: 10px;
  height: 7px;
  width: 35px;
}
</style>
