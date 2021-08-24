import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { Blog } from './Blogs';

describe('<Blog>', () => {
  let component = null;
  const blog = {
    url: 'https://google.com',
    title: 'Joy of testing',
    author: 'J. McMachine',
    likes: 1,
    user: {
      username: 'jake'
    }
  };
  const loggedUsername = 'jake';
  const handleDelete = jest.fn();
  const handleLikeClick = jest.fn();

  beforeEach(() => {
    component = render(<Blog
      blog={blog}
      loggedUsername={loggedUsername}
      handleDelete={handleDelete}
      handleLikeClick={handleLikeClick} />);
  });

  test('render author and title, but not url or likes', () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    const div = component.container.querySelector('.more_blog_data');
    expect(div).toHaveStyle('display: none');
  });
});