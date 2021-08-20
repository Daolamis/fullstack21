import { useState } from "react";

const BlogForm = ({handleSave}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new blog</h2>
      <div>Title <input type='text' value={title} onChange={e => setTitle(e.target.value)} /></div>
      <div>Author <input type='text' value={author} onChange={e => setAuthor(e.target.value)} /></div>
      <div>Url <input type='text' value={url} onChange={e => setUrl(e.target.value)} /></div>
      <button type='submit'>Create</button>
    </form>
  )
};

export default BlogForm;