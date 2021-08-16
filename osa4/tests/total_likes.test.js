const { totalLikes } = require('../utils/list_helper');
const { testBlog, testBlogs } = require('./testData');

describe('total likes', () => {
  test('of empty array is zero', () =>
    expect(totalLikes([])).toBe(0));

  test('when list has only one blog equal likes on that', () =>
    expect(totalLikes([testBlog])).toBe(10));

  test('of bigger list is calculated right', () =>
    expect(totalLikes(testBlogs)).toBe(36));
});