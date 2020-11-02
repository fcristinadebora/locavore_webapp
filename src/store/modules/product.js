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
    async get({commit}, { params }) {
      commit('setItems', null)

      try {
        const response = await api.get('products', { params: params }) 
        
        commit('setItems', response.data)
        
        return response
      } catch (error) {
        console.log(error)
        commit('setItems', false)
        throw new Error(error)
      }
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
    setItems (state, items) {
      state.items = items
    }
  }
}
