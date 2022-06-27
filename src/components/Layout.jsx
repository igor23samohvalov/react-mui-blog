import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';
import { actions as authorsActions } from '../slices/authorsSlice.js';
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
    if (localStorage.getItem('authors')) {
      dispatch(authorsActions.addAuthors(JSON.parse(localStorage.getItem('authors'))));
    }
  }, [dispatch]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Outlet />
    </Grid>
  );
}


export default Layout