import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(response => {
  let data = response.data
  return !data.err_code ? data : Promise.reject(data)
}, error => {
  return Promise.reject(error)
})