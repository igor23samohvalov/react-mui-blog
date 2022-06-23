import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import MainPage from './pages/MainPage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import AuthorsPage from './pages/AuthorsPage.jsx';
import CommentsPage from './pages/CommentsPage.jsx';
import SinglePost from './components/SinglePost.jsx';
import SingleAuthor from './components/SingleAuthor.jsx';
import SingleComment from './components/SingleComment.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<MainPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:id" element={<SinglePost />} />
        <Route path="authors" element={<AuthorsPage />} />
        <Route path="authors/:id" element={<SingleAuthor />} />
        <Route path="comments" element={<CommentsPage />} />
        <Route path="comments/:id" element={<SingleComment />} />
      </Route>
    </Routes>
  );
}

export default App;
