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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // count blogs from every author
  const summary = blogs.reduce((result, blog) => {
    const count = result[blog.author] || 0;
    return { ...result, [blog.author]: count + 1 };
  }, {});

  //find author of most blogs
  const mostBlogs = Object.entries(summary).reduce((result, next) => {
    const [author, blogs] = next;
    return result.blogs > blogs ? result : { author, blogs };
  }, { author: 'tmp', blogs: 0 });
  return mostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // count likes from every author
  const summary = blogs.reduce((result, blog) => {
    const likes = result[blog.author] || 0;
    return { ...result, [blog.author]: likes + blog.likes };
  }, {});

  //find author of most likes
  const mostLikes = Object.entries(summary).reduce((result, next) => {
    const [author, likes] = next;
    return result.likes > likes ? result : { author, likes };
  }, { author: 'tmp', likes: -1 });
  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};