import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as authorsActions } from './authorSlices.js';

const postsAdapter = createEntityAdapter();
const initialState = postsAdapter.getInitialState();

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,
    addPosts: postsAdapter.addMany,
    removePost: postsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(authorsActions.removeAuthor, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter((e) => e.author !== id);
      postsAdapter.setAll(state, restEntities);
    });
  },
});

export const { actions } = postsReducer;
export const selector = postsAdapter.getSelectors((state) => state.posts);
export default postsReducer.reducer;