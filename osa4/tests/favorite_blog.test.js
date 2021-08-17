const { favoriteBlog } = require('../utils/list_helper');
const { testBlog, testBlogs } = require('./testData');

describe('favorite blog', () => {

  test('of empty array is null', () => expect(favoriteBlog([])).toBeNull());

  test('when array has one blog, it\'s the favorit', () =>
    expect(favoriteBlog([testBlog]))
      .toEqual({ title: 'First class tests', author: 'Robert C. Martin', likes: 10 }));

  test('of bigger array, most favorit is returned', () =>
    expect(favoriteBlog(testBlogs))
      .toEqual({ title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 }));

  test('when array has two (or more) equally most favorite blogs, the last blog of them is', () => {
    const testBlogs2 = [...testBlogs];
    testBlogs2[4].likes = 99;
    testBlogs2[5].likes = 99;

    expect(favoriteBlog(testBlogs2))
      .toEqual({ title: testBlogs2[5].title, author: testBlogs2[5].author, likes: testBlogs2[5].likes });
  });

});