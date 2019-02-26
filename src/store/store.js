import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     bucket: "",
     buckets : [],
     files : [],
     loading: false,
     currentPath: ""
  },
  mutations,
  actions,
  getters
})
