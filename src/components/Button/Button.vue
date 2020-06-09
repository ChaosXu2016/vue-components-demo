<template>
  <button :class="`self-button ${type}`" @click="handleClick">
    <slot/>
  </button>
</template>
<script>
export default {
  props: {
    // primary | plain
    type: {
      type: String,
      default: 'primary',
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>
<style scoped lang="less">
.self-button {
  appearance: none;
  border-radius: 10px;
  padding: 11px 20px;
  line-height: 18px;
  font-size: 15px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  &:focus {
    outline-style: none;
  }
  &:active {
    opacity: .8;
  }
  &.primary {
    border-color: @mainBlueColor;
    color: @white;
    background-color: @mainBlueColor;
  }
  &.plain {
    border-color: #909096;
    color: #222230;
    background-color: @white;
  }
}
</style>
