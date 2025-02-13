import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePostStore from '../store/usePostStore';

const Posts = () => {
  const { all, fetchAllPosts } = usePostStore();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {all.length > 0 ? (
          all.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
                <p>Tags: {post.tags}</p>
                {post.coverUrl && <img src={post.coverUrl} alt="cover" width="200" />}
              </Link>
            </li>
          ))
        ) : (
          <p>No posts yet. Create one!</p>
        )}
      </ul>
    </div>
  );
};

export default Posts;
