import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleSave }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new blog</h2>
      <div>Title <input data-testid='title' type='text' value={title} onChange={e => setTitle(e.target.value)} /></div>
      <div>Author <input data-testid='author' type='text' value={author} onChange={e => setAuthor(e.target.value)} /></div>
      <div>Url <input data-testid='url' type='text' value={url} onChange={e => setUrl(e.target.value)} /></div>
      <button type='submit'>Create</button>
    </form>
  );
};

BlogForm.propTypes = {
  handleSave: PropTypes.func.isRequired
};

export default BlogForm;