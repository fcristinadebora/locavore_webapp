import api from '@/common/api.js'

export default {
  namespaced: true,

  state: {
    filial: null
  },

  actions: {
    async register (state, { data }) {
      try {
        const response = await api.post('registration', data)

        console.log('registration', response)
      } catch (error) {
        
        throw new Error(error)
      }
    }
  }
}
