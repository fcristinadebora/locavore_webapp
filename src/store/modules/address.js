import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {
    hasAddress: null,
  },

  getters: {
    hasAddress: (state) => state.hasAddress
  },

  actions: {
    async checkHasAddress({commit}, { params }) {
      try {
        const response = await api.get('addresses/total', { params: params }) 

        if(response.data.total > 0){
          commit('setHasAddress', true)
        }else{
          commit('setHasAddress', false)
        }

      } catch (error) {
        commit('setHasAddress', null)
        console.log(error)
      }
    },

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
  },

  mutations: {
    setHasAddress(state, value){
      state.hasAddress = value
    }
  }
}
