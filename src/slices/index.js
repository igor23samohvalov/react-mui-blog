import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './authorsSlice.js';
import postsReducer from './postsSlice.js';
import commentsReducer from './commentsSlice.js';

export default configureStore({
  reducer: {
    authors: authorsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  }
});