import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import Post from '../components/Post.jsx';
import NoData from '../components/NoData.jsx';

function PostsPage() {
  const posts = useSelector(postsSelector.selectAll);

  

  if (posts.length === 0) return (<NoData content="posts" />)

  return (
    <Grid container spacing={2} justifyContent="flex-start" sx={{ px: { md: 10, xs: 2 }}}>
      {posts.slice(0).reverse().map((p) => (
        <Grid item xs={12} md={4} key={p.id}>
          <Post {...p} />
        </Grid>  
      ))}
    </Grid>
  )
}

export default PostsPage;
