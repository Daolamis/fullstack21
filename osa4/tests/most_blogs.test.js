const { mostBlogs } = require('../utils/list_helper');
const { testBlog, testBlogs } = require('./testData');

describe('most blogs', () => {

  test('of empty array is null', () => expect(mostBlogs([])).toBeNull());

  test('of array of one is the same author and blog count is 1', () =>
    expect(mostBlogs([testBlog])).toEqual({ author: 'Robert C. Martin', blogs: 1 }));

  test('of bigger array is calculated correct', () =>
    expect(mostBlogs(testBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 }));

});