<template>
  <div class="airlines-filter rounded">
    <h3 v-text="title"></h3>
    <div class="airlines-filter__list">
      <div class="custom-control custom-checkbox" v-for="(item, index) in getAirlinesList" :key="index">
        <input type="checkbox" class="custom-control-input" :id="index" v-model="item.model" />
        <label class="custom-control-label" :for="index" v-text="item"></label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "AirlinesFilter",
  data() {
    return {
      title: 'Авиакомпании',
    }
  },
  computed: {
    ...mapGetters([
      'getAirlinesList'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import '../../variables';

  .airlines-filter {
    background-color: $aviata-primary-background-color;
    padding-bottom: 1rem;
  }

  h3 {
    font-weight: 600;
    font-size: 1.25rem;
    padding: 1rem 1rem 0.5rem;
  }

  .custom-control {
    padding: calc(0.5rem + 1px) 1rem calc(0.5rem + 1px) 3rem;

    &:hover {
      background-color: $aviata-gray-hover;
    }
  }

  .airlines-filter__list {
    max-height: 20rem;
    overflow: hidden;
    overflow-y: auto;
  }

</style>
