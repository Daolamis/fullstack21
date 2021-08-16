// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, b) => sum + b.likes, 0);
  return likes;
};

module.exports = {
  dummy, totalLikes
};