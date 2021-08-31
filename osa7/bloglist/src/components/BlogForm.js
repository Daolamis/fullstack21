import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InlineBlock, Section, Button } from './components.styled';

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
    <Section>
      <form onSubmit={handleSubmit}>
        <h2>Create a new blog</h2>
        <div><InlineBlock>Title</InlineBlock> <input data-testid='title' type='text' value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div><InlineBlock>Author</InlineBlock> <input data-testid='author' type='text' value={author} onChange={e => setAuthor(e.target.value)} /></div>
        <div><InlineBlock>Url</InlineBlock> <input data-testid='url' type='text' value={url} onChange={e => setUrl(e.target.value)} /></div>
        <Button data-testid='submit' type='submit'>Create</Button>
      </form>
    </Section>
  );
};

BlogForm.propTypes = {
  handleSave: PropTypes.func.isRequired
};

export default BlogForm;