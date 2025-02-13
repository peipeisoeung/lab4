import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostStore from '../store/usePostStore';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const createPost = usePostStore((state) => state.createPost);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      title, tags, content, coverUrl,
    });
    navigate('/');
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewPost;
