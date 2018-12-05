import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testData: '12313213',
  },
  mutations: {
    set_testData (state, { testData }) {
      state.testData = testData
    }
  }
})