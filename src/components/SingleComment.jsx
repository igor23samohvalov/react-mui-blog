import React from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector as commentsSelector } from '../slices/commentsSlice.js';
import Comment from './Comment.jsx';

function SingleComment() {
  const { id } = useParams();
  const comment = useSelector((state) => commentsSelector.selectById(state, id));

  return (
    <Grid item xs={12} md={5} sx={{ marginTop: 2 }}>
      <Comment {...comment} />
    </Grid>
  )
}

export default SingleComment