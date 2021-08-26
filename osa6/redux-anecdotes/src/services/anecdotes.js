import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (data) => {
const res = await axios.post(baseUrl, data)
return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }