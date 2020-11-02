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
    async fetchFromApi ({commit}, {params}) {
      try {
        const response = await api.get('favorites', {params:params})
        
        commit('setItems', response.data)
        return response
      } catch (error) {
        commit('setItems', [])
        throw new Error(error)
      }
    },

    async create ({commit}, {data}) {
      try {
        const response = await api.post(`favorites`, { ...data })
        
        commit('addItem', response.data.created)
        return response
      } catch (error) {
        commit('addItem', [])
        throw new Error(error)
      }
    },

    async delete ({commit}, {id}) {
      try {
        const response = await api.delete(`favorites/${id}`)
        
        commit('removeItem', id)
        return response
      } catch (error) {
        throw new Error(error)
      }
    },

    fetchPerPage (state, {params}) {
      return api.get('favorites', {params:params})
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
    },

    removeItem(state, id) {
      const items = state.items

      const filteredItems = items.filter(item => item.id !== id)
      
      state.items = filteredItems
    }
  }
}
