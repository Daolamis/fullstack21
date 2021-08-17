const { mostLikes } = require('../utils/list_helper');
const { testBlog, testBlogs } = require('./testData');

describe('most likes', () => {

  test('of empty array is null', () => expect(mostLikes([])).toBeNull());

  test('of array of one is the same author and blog count is 1', () =>
    expect(mostLikes([testBlog])).toEqual({ author: 'Robert C. Martin', likes: 10 }));

  test('of bigger array is calculated correct', () =>
    expect(mostLikes(testBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 }));

});