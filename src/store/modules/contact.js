import api from '@/common/api.js'

export default {
  namespaced: true,

  actions: {
    get(state, { params }) {
      return api.get('contacts', { params: params }) 
    },

    getById(state, { id, params }) {
      return api.get(`contacts/${id}`, { params: params })
    },

    create (commit, { data }) {
      return api.post(`contacts`, { ...data })
    },

    update (commit, { id, data }) {
      return api.put(`contacts/${id}`, { ...data })
    },

    delete (commit, { id }) {
      return api.delete(`contacts/${id}`)
    }
  }
}
