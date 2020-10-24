import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {
    filial: null
  },

  actions: {
    register (state, { data }) {
      return api.post('register', data)
    },
    login (state, { data }) {
      return api.post('login', data)
    }
  }
}
