import React from 'react';
import {
  BrowserRouter as Routes, Route, Router,
} from 'react-router';
import FallBack from './pages/Fallback';
import NavBar from './components/NavBar';
import Post from './pages/Post';
import NewPost from './pages/NewPost';
import Posts from './pages/Posts';

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
