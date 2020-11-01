import axios from 'axios'

const getApiUrl = () => {
  return 'http://192.168.0.102:8000/'
}

const getLocalStorageToken = () => {
  if (!localStorage.getItem('authToken')) {
    return null
  }

  const token = localStorage.getItem('authToken')
  if (!token) {
    return null
  }

  return token
}

const client = axios.create({
  baseURL: `${getApiUrl()}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

client.interceptors.request.use((config) => {
  config.headers.Token = getLocalStorageToken()

  return config
})

export default client

export { getApiUrl }
