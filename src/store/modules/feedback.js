import api from '@/common/api.js'

export default {
  namespaced: true,

  actions: {
    async create (state, {data}) {
      return api.post(`feedbacks`, { ...data })
    },
  }
}
