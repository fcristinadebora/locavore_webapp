import api from '@/common/api.js'

export default {
  namespaced: true,

  actions: {
    get(state, { params }) {
      return api.get('addresses', { params: params }) 
    },

    getById(state, { id, params }) {
      return api.get(`addresses/${id}`, { params: params })
    },

    create (commit, { data }) {
      return api.post(`addresses`, { ...data })
    },

    update (commit, { id, data }) {
      return api.put(`addresses/${id}`, { ...data })
    },

    delete (commit, { id }) {
      return api.delete(`addresses/${id}`)
    }
  }
}
