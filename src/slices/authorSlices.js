import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const authorsAdapter = createEntityAdapter();
const initialState = authorsAdapter.getInitialState();

const authorsReducer = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: authorsAdapter.addOne,
    removeAuthor: authorsAdapter.removeOne,
  }
});

export const { actions } = authorsReducer;
export const selector = authorsAdapter.getSelectors((state) => state.authors);
export default authorsReducer.reducer;