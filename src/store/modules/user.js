import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {
    user: null,
    profile: null
  },

  getters: {
    user: (state) => state.user
  },

  actions: {
    register (state, { data }) {
      return api.post('register', data)
    },
    login (state, { data }) {
      return api.post('login', data)
    },
    async authenticated ({commit}) {
      try {
        const response = await api.get('authenticated')
        
        commit('setUser', response.data.user)
        return response
      } catch (error) {
        commit('setUser', false)
        throw new Error(error)
      }
    },
    getProfile () {
      return api.get('profile')
    }
  },

  mutations: {
    setUser (state, item) {
      state.user = item
    }
  }
}
