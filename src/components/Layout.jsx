import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';
import Header from './Header.jsx';


function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('posts')) {
      dispatch(postsActions.addPosts(JSON.parse(localStorage.getItem('posts'))));
    }
    if (localStorage.getItem('comments')) {
      dispatch(commentsActions.addComments(JSON.parse(localStorage.getItem('comments'))));
    }
  }, [dispatch]);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} md={5}>
        <Outlet />
      </Grid>
    </Grid>
  );
}


export default Layout