import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import AddPost from '../components/AddPost';
import Post from '../components/Post.jsx';
import AddRandomContent from '../components/AddRandomContent.jsx';

function MainPage() {
  const posts = useSelector(postsSelector.selectAll);

  return (
    <Grid item xs={12} md={5} sx={{ px: { md: 0, xs: 1 }}}>
      <AddRandomContent />
      <AddPost />
      {posts.slice(0).reverse().map((p) => <Post key={p.id} {...p} />)}
    </Grid>
  )
}

export default MainPage