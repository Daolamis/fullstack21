import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => token = `bearer ${newToken}`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (blog) => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;

}

const addLikes = async (likes, blogId) => {
  // we don't need to send whole blog when updating just likes.
  // MongoDB updates onyy existing properties
  const response = await axios.put(`${baseUrl}/${blogId}`, { likes });
  return (await response).data
}

export default { getAll, create, setToken, addLikes };