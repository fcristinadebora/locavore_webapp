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

    getById(state, { id, params }) {
      return api.get(`products/${id}`, { params: params })
    },

    create (commit, { data }) {
      return api.post(`products`, { ...data })
    },

    update (commit, { id, data }) {
      return api.put(`products/${id}`, { ...data })
    },

    delete (commit, { id }) {
      return api.post(`delete/${id}`)
    }
  },

  mutations: {

  }
}
