import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addComment } from '../reducers/blogs';

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(blogId, comment));
    setComment('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setComment(e.target.value)} value={comment} />
        <button type='submit'>add comment</button>
      </form>
    </div>
  );
};
export default CommentForm;