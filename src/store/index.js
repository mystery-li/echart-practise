import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLine: false,
    showMap: false,
    showRank: false,
    showStock: false,
    showTrend: false,
    showProduct: false,
    theme: 'chalk'
  },
  getters: {
  },
  mutations: {
    changeShowLine (state, index) {
      if (index === 1) {
        state.showLine = true
      } else {
        state.showLine = false
      }
    },
    changeShowMap (state, index) {
      if (index === 1) {
        state.showMap = true
      } else {
        state.showMap = false
      }
    },
    changeShowRank (state, index) {
      if (index === 1) {
        state.showRank = true
      } else {
        state.showRank = false
      }
    },
    changeShowStock (state, index) {
      if (index === 1) {
        state.showStock = true
      } else {
        state.showStock = false
      }
    },
    changeShowTrend (state, index) {
      if (index === 1) {
        state.showTrend = true
      } else {
        state.showTrend = false
      }
    },
    changeShowProduct (state, index) {
      if (index === 1) {
        state.showProduct = true
      } else {
        state.showProduct = false
      }
    },
    changeTheme (state) {
      if (state.theme === 'chalk') {
        state.theme = 'vintage'
      } else {
        state.theme = 'chalk'
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
