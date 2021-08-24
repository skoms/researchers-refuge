import { createSlice } from '@reduxjs/toolkit';

export const searchFieldSlice = createSlice({
  name: 'searchField',
  initialState: {
    searchTerm: '',
  },
  reducers: {
    updateSearchTerm: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload
      }
    },
  }
})

export const { updateSearchTerm } = searchFieldSlice.actions;

export const selectSearchTerm = state => state.searchTerm;

export default searchFieldSlice.reducer;

