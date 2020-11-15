import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tag from './modules/tag'
import grower from './modules/grower'
import productCategory from './modules/productCategory'
import product from './modules/product'
import image from './modules/image'
import cidade from './modules/cidade'
import favorite from './modules/favorite'
import interest from './modules/interest'
import address from './modules/address'
import contact from './modules/contact'
import feedback from './modules/feedback'
import rating from './modules/rating'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    tag,
    grower,
    productCategory,
    product,
    image,
    cidade,
    favorite,
    interest,
    address,
    contact,
    feedback,
    rating
  },
  strict: debug
})
