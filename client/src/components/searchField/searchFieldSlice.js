import { createSlice } from '@reduxjs/toolkit';

export const searchFieldSlice = createSlice({
  name: 'searchField',
  initialState: {
    searchTerm: '',
  },
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload
      }
    },
  }
})

export const { update } = searchFieldSlice.actions;

export const selectSearchTerm = state => state.searchTerm;

export default searchFieldSlice.reducers;

