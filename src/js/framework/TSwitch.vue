<template>
  <label class="switch">
    <input @change="toggleSwitch" type="checkbox" checked>
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: "TSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleSwitch(event) {
      this.$emit('input', event.target.checked);
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #D4D5D6;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #0065F5;
}

input:focus + .slider {
  box-shadow: 0 0 1px #0065F5;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
