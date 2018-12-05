import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testData: '12313213',
    tag: 'net'
  },
  mutations: {
    set_testData (state, { testData }) {
      state.testData = testData
    },
    set_tag (state, { tag }) {
      state.tag = tag
    }
  }
})