import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tag from './modules/tag'
import grower from './modules/grower'
import productCategory from './modules/productCategory'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    tag,
    grower,
    productCategory
  },
  strict: debug
})
