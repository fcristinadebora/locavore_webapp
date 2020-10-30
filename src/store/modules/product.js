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
      return api.delete(`products/${id}`)
    },

    attachImages (commit, { id, data }) {
      return api.post(`products/images/${id}`, { ...data })
    },

    getImages (commit, { id, params }) {
      return api.get(`products/images/${id}`, { params: params })
    }
  },

  mutations: {

  }
}
