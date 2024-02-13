import axios from 'axios'

export const apiUrl = process.env.REACT_APP_API_URL

// export const apiUrl = 'https://todobe-production-2979.up.railway.app'

export const apiConfig = {
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}
export const api = axios.create(apiConfig)
