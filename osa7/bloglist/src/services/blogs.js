import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => token = `bearer ${newToken}`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = { headers: { Authorization: token }, };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;

};

const addLikes = async (blog) => {
  // we don't need to send whole blog when updating just likes.
  // MongoDB updates only existing properties
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 });
  return response.data;
};

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment });
  return response.data;
};

const remove = async (blogId) => {
  const config = { headers: { Authorization: token }, };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, create, setToken, addLikes, addComment, remove };