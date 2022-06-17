import React from 'react';
import { useSelector } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import AddPost from '../components/AddPost';
import Post from '../components/Post.jsx';

function MainPage() {
  const posts = useSelector(postsSelector.selectAll);

  return (
    <>
      <AddPost />
      {posts.map((p) => <Post key={p.id} {...p} />)}
    </>
  )
}

export default MainPage