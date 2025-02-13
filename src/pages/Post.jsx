import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePostStore from '../store/usePostStore';

const Post = () => {
  const { postID } = useParams(); // Get postID from URL
  const {
    current, fetchPost, updatePost, deletePost,
  } = usePostStore();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedTags, setUpdatedTags] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedCoverUrl, setUpdatedCoverUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost(postID);
  }, [postID]);

  useEffect(() => {
    if (current) {
      setUpdatedTitle(current.title || '');
      setUpdatedTags(current.tags || '');
      setUpdatedContent(current.content || '');
      setUpdatedCoverUrl(current.coverUrl || '');
    }
  }, [current]);

  const handleUpdate = async () => {
    await updatePost(postID, {
      title: updatedTitle,
      tags: updatedTags,
      content: updatedContent,
      coverUrl: updatedCoverUrl,
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deletePost(postID);
    navigate('/');
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Post' : current.title}</h1>

      {isEditing ? (
        <>
          <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          <input type="text" value={updatedTags} onChange={(e) => setUpdatedTags(e.target.value)} />
          <textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
          <input type="text" value={updatedCoverUrl} onChange={(e) => setUpdatedCoverUrl(e.target.value)} />
          <button type="button" onClick={handleUpdate} aria-label="save-changes">Save Changes</button>
        </>
      ) : (
        <>
          <p>Tags: {current.tags}</p>
          <p>{current.content}</p>
          {current.coverUrl && <img src={current.coverUrl} alt="cover" width="200" />}
        </>
      )}

      <button
        type="button"
        onClick={() => setIsEditing(!isEditing)}
        aria-label={isEditing ? 'cancel-editing' : 'edit-post'}
      >
        {isEditing ? 'Cancel' : 'Edit'}
      </button>

      <button type="button" onClick={handleDelete} aria-label="delete-post">Delete</button>
    </div>
  );
};

export default Post;
