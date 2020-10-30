import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {

  },

  getters: {
  },

  actions: {
    get(state, { params }) {
      return api.get('products', { params: params })
    },

    create (commit, { data }) {
      return api.post(`products`, { ...data })
    },

    update (commit, { id, data }) {
      return api.post(`products/${id}`, { ...data })
    },

    delete (commit, { id }) {
      return api.post(`delete/${id}`)
    }
  },

  mutations: {

  }
}
