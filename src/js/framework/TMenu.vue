<template>
  <div class="t-menu" :class="{ 't-menu--list': list }">
    <t-menu-item
      v-for="(item, index) in items"
      :key="index"
      :title="item.name"
      :icon="item.icon"
      :is-list-item="list"
      :selected-sub-item="selectedItem"
      @click.native="selectItem(item.value)"
    ></t-menu-item>
  </div>
</template>

<script>
export default {
  name: "TMenu",
  props: {
    items: {
      type: Array
    },
    list: {
      type: Boolean
    }
  },
  data() {
    return {
      selectedItem: null
    }
  },
  methods: {
    selectItem(item) {
      // this.selectedItem = item;
      this.$emit('select', item);
    }
  }
}
</script>

<style lang="scss" scoped>

  .t-menu {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background: var(--body-background);

    &--list {

    }
  }

  ::v-deep .t-menu__item:last-child {
    border: none;
  }

</style>
