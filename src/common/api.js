import axios from 'axios'

const getApiUrl = () => {
  return 'http://localhost:8000'
}

const getLocalStorageToken = () => {
  console.log('kkkk',localStorage.getItem('authToken'))
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
