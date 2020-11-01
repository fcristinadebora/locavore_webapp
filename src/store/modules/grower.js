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
        const response = await api.get('growers', { params: params }) 
        
        if(response.data.data.length == 0){
          commit('setItems', false)  
        }else{
          commit('setItems', response.data)
        }

        return response
      } catch (error) {
        console.log(error)
        commit('setItems', false)
        throw new Error(error)
      }
    },

    getById (commit, { id, params }) {
      return api.get(`growers/${id}`, { params: params })
    },

    update (commit, { id, data }) {
      return api.put(`growers/${id}`, { ...data })
    },

    attachImages (commit, { id, data }) {
      return api.post(`growers/images/${id}`, { ...data })
    },

    getImages (commit, { id, params }) {
      return api.get(`growers/images/${id}`, { params: params })
    }
  },

  mutations: {
    setItems (state, items) {
      state.items = items
    }
  }
}
