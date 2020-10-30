import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {

  },

  getters: {
  },

  actions: {
    update (commit, { id, data }) {
      return api.put(`images/${id}`, { ...data })
    },

    delete (commit, { id }) {
      return api.delete(`images/${id}`)
    }
  },

  mutations: {

  }
}
