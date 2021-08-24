import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import BlogForm from './BlogForm';

describe('<BlogForm/>', () => {

  test('blog submission', () => {
    const title = 'Joy of testing';
    const author = 'John Smith';
    const url = 'https://google.com';
    const handleSaveMock = jest.fn();
    const component = render(<BlogForm handleSave={handleSaveMock} />);

    const titleInput = component.getByTestId('title');
    fireEvent.change(titleInput, { target: { value: title } });

    const authorInput = component.getByTestId('author');
    fireEvent.change(authorInput, { target: { value: author } });

    const urlInput = component.getByTestId('url');
    fireEvent.change(urlInput, { target: { value: url } });

    const button = component.getByText('Create');
    fireEvent.click(button);

    expect(handleSaveMock.mock.calls[0][0]).toEqual({ title, author, url });

  });

});