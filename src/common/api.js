import axios from 'axios'

const getApiUrl = () => {
  return 'http://localhost:8001'
}

const getLocalStorageToken = () => {
  if (!localStorage.getItem('authToken')) {
    return null
  }

  const localStorageFilial = localStorage.getItem('authToken')
  if (!localStorageFilial.token) {
    return null
  }

  return localStorageFilial.token
}

const client = axios.create({
  baseURL: `${getApiUrl()}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

const setToken = (client) => {
  client.defaults.headers.common.Token = getLocalStorageToken()

  return client
}

export default client

export { setToken }
