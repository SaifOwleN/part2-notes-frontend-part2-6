import axios from "axios"
const baseUrl = "/api/notes"
const userUrl = "/api/users"
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async (userID) => {
  const noteString = await axios
    .get(`${userUrl}/${userID}`)
    .then((response) => response.data.notes.toString())
  let noteIds = noteString.split(",")
  let notes = []
  for (let i = 0; i < noteIds.length; i++) {
    const note = await axios.get(`${baseUrl}/${noteIds[i]}`).then((r) => r.data)
    notes.push(note)
  }

  return notes
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios
    .post(baseUrl, newObject, config)
    .then((response) => response.data)
  return request
}

const update = async (id, Object) => {
  const request = await axios
    .put(`${baseUrl}/${id}`, Object)
    .then((res) => res.data)
  return request
}

const delte = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const delted = await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  create,
  update,
  setToken,
  delte,
}
