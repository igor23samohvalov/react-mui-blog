import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as postsActions } from './postsSlice.js';
import { actions as authorsActions } from './authorsSlice.js';

const commentsAdapter = createEntityAdapter();
const initialState = commentsAdapter.getInitialState();

const commentsReducer = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: commentsAdapter.addOne,
    addComments: commentsAdapter.addMany,
    removeComment: commentsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(postsActions.removePost, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter((e) => e.postId !== id);
      commentsAdapter.setAll(state, restEntities);
    });
    builder.addCase(authorsActions.removeAuthor, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter((e) => e.authorId !== id);
      commentsAdapter.setAll(state, restEntities);

    });
  }
});

export const { actions } = commentsReducer;
export const selector = commentsAdapter.getSelectors((state) => state.comments);
export default commentsReducer.reducer;