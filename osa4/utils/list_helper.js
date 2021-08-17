// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, b) => sum + b.likes, 0);
  return likes;
};


const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((current, next) => {
    const { title, author, likes } = next;
    return current !== null && current.likes > likes ? current : { title, author, likes };
  }, null);
  return favorite;
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};