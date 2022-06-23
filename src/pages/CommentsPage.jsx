import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { selector as commentsSelector } from '../slices/commentsSlice.js';
import Comment from '../components/Comment.jsx';
import NoData from '../components/NoData.jsx';

function CommentsPage() {
  const comments = useSelector(commentsSelector.selectAll);

  if (comments.length === 0) return (<NoData content="comments" />)

  return (
    <Grid container spacing={2} justifyContent="flex-start" p={10}>
      {comments.slice(0).reverse().map((c) => (
        <Grid item xs={12} md={3} key={c.id}>
          <Comment {...c} />
        </Grid>  
      ))}
    </Grid>
  )
}

export default CommentsPage;