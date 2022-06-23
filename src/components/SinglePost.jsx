import React from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import Post from './Post.jsx';

function SinglePost() {
  const { id } = useParams();
  const post = useSelector((state) => postsSelector.selectById(state, id));

  return (
    <Grid item xs={12} md={5}>
      <Post {...post} />
    </Grid>
  )
}

export default SinglePost