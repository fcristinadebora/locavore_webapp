import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    items: (state) => state.items
  },

  actions: {
    async fetchFromApi ({commit}) {
      try {
        const response = await api.get('product-categories')
        
        commit('setItems', response.data.tags)
        return response
      } catch (error) {
        commit('setItems', [])
        throw new Error(error)
      }
    }
  },

  mutations: {
    setItems (state, items) {
      state.items = items
    },

    addItem(state, item) {
        const items = state.items

        items.push(item)
        
        state.items = items
    }
  }
}
