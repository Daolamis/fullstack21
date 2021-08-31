import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../reducers/blogs';

import { Button, Section } from './components.styled';

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(blogId, comment));
    setComment('');
  };

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setComment(e.target.value)} value={comment} />
        <Button type='submit'>add comment</Button>
      </form>
    </Section>
  );
};
export default CommentForm;