import axios from 'axios'

const getApiUrl = () => {
  return 'http://viacep.com.br/ws/'
}

const client = axios.create({
  baseURL: `${getApiUrl()}`
})

export default client
