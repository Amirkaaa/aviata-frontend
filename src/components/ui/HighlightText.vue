<template>
  <span @click="$emit('click')"><slot></slot></span>
</template>

<script>
  export default {
    name: "HighlightText",
  }
</script>

<style scoped lang="scss">
  @import '../../variables';

  span {
    color: $aviata-blue;
    cursor: pointer;
    border-bottom: 1px dashed rgba($aviata-blue, 0.5);
  }
</style>
