import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selector as authorsSelector } from '../slices/authorsSlice';
import Author from './Author.jsx';

function SingleAuthor() {
  const { id } = useParams();
  const author = useSelector((state) => authorsSelector.selectById(state, id));

  return (
    <Grid item xs={12} md={5}>
      <Author {...author} />
    </Grid>
  )
}

export default SingleAuthor;