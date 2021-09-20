import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const SET_CURRENCY = "SET_CURRENCY";

export default new Vuex.Store({
  state: {
    currency: null,
  },
  mutations: {
    [SET_CURRENCY](state, payload) {
      state.currency = payload    }
  },
  getters: {
    currency: state => state.currency
  }
})
