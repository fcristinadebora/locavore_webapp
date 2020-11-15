import api from '@/common/api.js'

export default {
  namespaced: true,

  actions: {
    async create (state, {data}) {
      return api.post(`ratings`, { ...data })
    },
    async get (state, {params}) {
      return api.get(`ratings`, { params: {...params} })
    },
    async getAvg (state, {params}) {
      return api.get(`ratings/avg`, { params: {...params} })
    },
  }
}
