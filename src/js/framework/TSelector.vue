<template>
  <div class="t-selector" :style="selectorStyles">
    <div
        class="t-selector__item"
        v-for="(item, index) in items"
        :class="{ 't-selector__item--selected': selectedItem === item.value }"
        :key="index"
        @click="selectItem(item.value)"
        ref="selectorItems"
    >
        <component class="t-selector__item-icon" v-if="item.icon" :is="item.icon"></component>
        <span class="t-selector__item-name">{{ item.name }}</span>
    </div>
    <div class="t-selector__border" :style="borderStyle"></div>
  </div>
</template>

<script>

export default {
  name: "TSelector",
  props: {
    height: {
      type: String,
      required: false,
      default: '32px'
    },
    // Sets width to 100%
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    delimiter: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Array of objects:
     * {
     *   name: 'Name',
     *   value: 'name'
     *   icon: IconComponent
     * }
     *
     */
    items: {
      type: Array,
      required: true
    },
    selectedItem: {
      type: String
    },
  },
  data() {
    return {
      elementsWidths: [0],
      currentElementWidth: 0,
      previousSelectedItemIndex: null
    }
  },
  methods: {
    selectItem(value) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.selectedItem === this.items[i].value) {
          this.previousSelectedItemIndex = i;
          break;
        }
      }
      this.$emit('select', value);
      this.$emit('input', value);
    },
    setElementsWidths() {
      this.elementsWidths = [];
      if (this.$refs.selectorItems && this.$refs.selectorItems.length > 0) {
        this.$refs.selectorItems.forEach(element => {
          this.elementsWidths.push(element.offsetWidth)
        });
      }
    }
  },
  computed: {
    selectorStyles() {
      return {
        height: this.height,
        width: this.block ? 'auto' : 'fit-content'
      }
    },
    borderStyle() {
      this.setElementsWidths()

      const values = this.items.map((item) => {
        return item.value;
      })
      const selectedItemIndex = values.indexOf(this.selectedItem);

      let width = this.elementsWidths[selectedItemIndex] - 2; // -border width

      // if element width is not int
      if (!this.block) {
        width -= 1;
      }

      let translateXPx = 0;
      if (selectedItemIndex !== 0) {
        for (let i = 0; i < selectedItemIndex; i++) {
          translateXPx += this.elementsWidths[i]
        }
      }

      return { 'transform': `translateX(${translateXPx}px)`, 'width': `${width}px` };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setElementsWidths()
    });
  },
  watch: {
    'screenSizes': {
      handler() {
        this.setElementsWidths()
      },
      deep: true
    },
    '$store.state.appLocale': {
      handler(newval) {
        console.log(newval)
        this.$nextTick(() => {
          this.setElementsWidths()
        })
      }
    }
  },
  beforeMount() {
    this.previousSelectedItemIndex = this.items.find((item) => {
      return item.name === this.selectItem
    });
  }
}
</script>

<style lang="scss" scoped>

  .t-selector {
    display: flex;
    line-height: 24px;
    width: fit-content;
    align-items: center;
    max-height: 38px;
    position: relative;
    padding: 2px 0;
    background: var(--card-background);
    border-radius: 12px;

    &__item {
      height: 100%;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid transparent;
      flex: 1;
      padding: 16px 20px;
      color: var(--selected-big-text);
      cursor: pointer;
      font-weight: 500;

      &-icon {
        margin-right: 8px;
      }

      &--selected {
        color: var(--selector-big-selected-text);
        background: var(--selector-big-selected-background);
      }
    }

    &__border {
      position: absolute;
      bottom: 0;
      left: 0;
      height: calc(100% - 4px);
      border: 2px solid var(--selector-big-selected-border);
      transition: all 0.3s ease-in-out;
      border-radius: 12px;
    }
  }

  @media screen and (max-width: 480px) {

    .t-selector {
      border: 1px solid var(--selector-big-mobile-border-color);

      &__item {
        padding: 8px 16px;
      }

      &__border {
        height: calc(100% - 2px);
        bottom: -1px;
      }
    }
  }

</style>
