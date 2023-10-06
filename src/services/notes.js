import axios from "axios"
const baseUrl = "/api/notes"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = (userId) => {
  const request = axios.get(`${baseUrl}/${userId}`)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const update = (id, Object) => {
  const request = axios.put(`${baseUrl}/${id}`, Object)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken,
}
