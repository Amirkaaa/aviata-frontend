<template>
  <div class="home">
    <div class="home-header bg-white">
      <div class="container py-2">
        <div class="row justify-content-center py-4">
          <div class="col-10">
            <img src="../assets/logo.svg" alt="Logo">
          </div>
        </div>
      </div>
    </div>
    <div class="home-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-3">
            <tariff-options-filter class="mb-3" />
            <airlines-filter class="mb-3" />
            <highlight-text @click="resetFiltersAndOptions" v-text="resetFilters" />
          </div>
          <div class="col-12 col-md-9">
            <ticket class="mb-3" :data="flight" v-for="(flight, index) in getFlightsList" :key="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TariffOptionsFilter from "../components/filters/TariffOptionsFilter";
import AirlinesFilter from "../components/filters/AirlinesFilter";
import HighlightText from "../components/ui/HighlightText";
import Ticket from "../components/ui/Ticket";

export default {
  name: 'home',
  components: {
    TariffOptionsFilter,
    AirlinesFilter,
    HighlightText,
    Ticket
  },
  data() {
    return {
      resetFilters: 'Сбросить все фильтры',
    }
  },
  computed: {
    ...mapGetters([
      'getFlightsList',
    ])
  },
  methods: {
    ...mapActions([
      'resetFiltersAndOptions'
    ])
  }
}
</script>

<style scoped lang="scss">
</style>
