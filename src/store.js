import Vue from 'vue'
import Vuex from 'vuex'
import { airlines, flights } from './results'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    airlines,
    flights
  },
  getters: {
    getAirlinesList: state => state.airlines,
    getFlightsList: state => state.flights
  },
  mutations: {

  },
  actions: {

  }
})
