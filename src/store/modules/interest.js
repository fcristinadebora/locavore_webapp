import api from '@/common/api.js'

export default {
  namespaced: true,

  actions: {
    create (state, { data }) {
      return api.post('interests', data)
    },
    delete (state, { id }) {
      return api.delete(`interests/${id}`)
    },
    get (state, { params }) {
      return api.get(`interests`, {params: params})
    },
    getCompatible (state, { params }) {
      return api.get(`interests/compatible`, {params: params})
    },
  }
}
