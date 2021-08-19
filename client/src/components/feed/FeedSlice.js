import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    filter: 'Popular'
  },
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        filter: action.payload
      }
    }
  }
});

export const { update } = feedSlice.actions;

export const selectFilter = state => state.filter;

export default feedSlice.reducer;