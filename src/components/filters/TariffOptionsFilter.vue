<template>
  <div class="tariff-options-filter rounded">
    <h3 v-text="title"></h3>

    <div class="custom-control custom-checkbox" v-for="(option, index) in options" :key="index">
      <input type="checkbox" class="custom-control-input" :id="'option' + index" :checked="getOption(option.state)" @input="setOption(option.method)" />
      <label class="custom-control-label" :for="'option' + index" v-text="option.title"></label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TariffOptionsFilter",
  data() {
    return {
      title: 'Опции тарифа',
      options: [
        {
          title: 'Только прямые',
          method: 'toggleDirectFlight',
          state: 'directFlight'
        },
        {
          title: 'Только с багажом',
          method: 'toggleWithBag',
          state: 'withBag'
        },
        {
          title: 'Только возвратные',
          method: 'toggleRefundable',
          state: 'refundable'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getOption'
    ])
  },
  methods: {
    ...mapActions([
      'toggleDirectFlight',
      'toggleWithBag',
      'toggleRefundable'
    ]),

    setOption(method) {
      this[method].call()
    }
  }
}
</script>

<style scoped lang="scss">

  @import '../../variables';

  .tariff-options-filter {
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

</style>
