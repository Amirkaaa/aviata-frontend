import Vue from 'vue'
import Vuex from 'vuex'
import { airlines, flights } from './results'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    airlines,
    flights,
    directFlight: false,
    withBag: false,
    refundable: false,
    allAirlines: true,
    selectedAirlines: []
  },
  getters: {
    getOption: state => option => state[option],
    getAirlineOption: state => airline => state.selectedAirlines.includes(airline),
    getAirlinesList: state => Object.keys(state.airlines).map(code => ({
      carrier_name: state.airlines[code],
      carrier: code
    })),
    getFlightsList: state => {
      return state.flights.filter(flight => {
        if (state.directFlight && flight['itineraries'][0][0]['stops'] !== 0) {
          return false
        }

        if (state.refundable && !flight['refundable']) {
          return false
        }

        return state.allAirlines ? true : state.selectedAirlines.length > 0 && state.selectedAirlines.includes(flight['itineraries'][0][0]['carrier']);
      })
    },
  },
  mutations: {
    toggleDirectFlight(state) {
      state.directFlight = !state.directFlight
    },
    toggleWithBag(state) {
      state.withBag = !state.withBag
    },
    toggleRefundable(state) {
      state.refundable = !state.refundable
    },
    toggleAllAirlines(state) {
      state.allAirlines = !state.allAirlines
      state.selectedAirlines = []
    },
    disableAllAirlines(state) {
      state.allAirlines = false;
    },
    addAirline(state, airline) {
      state.selectedAirlines.push(airline)
    },
    removeAirline(state, airline) {
      state.selectedAirlines.splice(state.selectedAirlines.indexOf(airline), 1)
    },
    resetFiltersAndOptions(state) {
      state.directFlight = false
      state.withBag = false
      state.refundable = false
      state.allAirlines = true
      state.selectedAirlines = []
    }
  },
  actions: {
    toggleDirectFlight({ commit }) {
      commit('toggleDirectFlight')
    },
    toggleWithBag({ commit }) {
      commit('toggleWithBag')
    },
    toggleRefundable({ commit }) {
      commit('toggleRefundable')
    },
    toggleAllAirlines({ commit }) {
      commit('toggleAllAirlines')
    },
    toggleAirline({ state, commit }, airline) {
      if (state.allAirlines) commit('toggleAllAirlines')
      state.selectedAirlines.includes(airline) ? commit('removeAirline', airline) : commit('addAirline', airline)
    },
    resetFiltersAndOptions({ commit }) {
      commit('resetFiltersAndOptions')
    }
  }
})
