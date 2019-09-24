<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import 'variables';

  html {
    font-size: 12px;
  }

  html,
  body,
  #app {
    min-height: 100%;
  }

  #app {
    background-color: $aviata-secondary-background-color;
  }
</style>
