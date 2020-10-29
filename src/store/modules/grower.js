import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {
    items: null
  },

  getters: {
    items: (state) => state.items
  },

  actions: {
    async fetchFromApi ({commit}) {
      try {
        const response = await api.get('growers')
        
        commit('setItems', response.data.tags)
        return response
      } catch (error) {
        commit('setItems', [])
        throw new Error(error)
      }
    },
    getById (commit, { id, params }) {
      return api.get(`growers/${id}`, { params: params })
    },
    update (commit, { id, data }) {
      return api.put(`growers/${id}`, { ...data })
    }
  },

  mutations: {
    setItems (state, items) {
      state.items = items
    }
  }
}
