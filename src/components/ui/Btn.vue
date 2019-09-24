<template>
  <button class="btn btn-primary" :class="btnStyles">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Btn",
  props: {
    block: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnStyles () {
      return {
        'btn-block': this.block,
        'font-weight-bold': this.bold
      }
    }
  }
}
</script>

<style scoped>

</style>
