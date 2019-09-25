<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import 'variables';

  html {

    @media (min-width: 576px) {
      font-size: 8px;
    }

    @media (min-width: 768px) {
      font-size: 10px;
    }

    @media (min-width: 992px) {
      font-size: 11px;
    }

    @media (min-width: 1200px) {
      font-size: 12px;
    }
  }

  html,
  body,
  #app {
    height: 100%;
  }

</style>
