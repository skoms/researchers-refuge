import { createSlice } from "@reduxjs/toolkit";
import { getFeedArticles } from "../feed/feedSlice";
import { getResults } from "../searchResults/searchResultsSlice";
import { getUserArticles } from "../user/userProfile/userFeedSlice";

const initialState = {
  page: 1,
  lastPage: null,
  hasMore: false
}

export const paginationBarSlice = createSlice({
  name: 'paginationBar',
  initialState,
  reducers: {
    toFirstPage: (state) => {
      return { ...state, page: 1, hasMore: true };
    },
    decrementPage: (state) => {
      return state.page > 1 ? 
        { 
          ...state, 
          page: state.page - 1,
          hasMore: state.lastPage ? 
            (state.page - 1) < state.lastPage
            : false
        } : state;
    },
    incrementPage: (state) => {
      return state.hasMore ? 
        { 
          ...state, 
          page: state.page + 1,
          hasMore: state.lastPage ? 
            (state.page + 1) < state.lastPage
            : false
        } : state;
    },
    toLastPage: (state) => {
      return state.lastPage ? 
        { 
          ...state, 
          page: state.lastPage,
          hasMore: false
        } : state;
    },
    setLastPage: (state, action) => {
      return { ...state, lastPage: action.payload };
    },
    setHasMore: (state, action) => {
      return { ...state, hasMore: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedArticles.fulfilled, (state, action) => {
      const { data, status } = action.payload;
      let result = state;
      if (status === 200) {
        result.hasMore = data.hasMore;
        result.lastPage = data.lastPage;
      };
      return result;
    });
    builder.addCase(getUserArticles.fulfilled, (state, action) => {
      const { data, status } = action.payload;
      let result = state;
      if (status === 200) {
        result.hasMore = data.hasMore;
        result.lastPage = data.lastPage;
      };
      return result;
    });
    builder.addCase(getResults.fulfilled, (state, action) => {
      const { data, status } = action.payload.articles;
      let result = state;
      if (status === 200) {
        result.hasMore = data.hasMore;
        result.lastPage = data.lastPage;
      };
      return result;
    });
  }
});

export const { 
  toFirstPage, incrementPage, decrementPage, 
  setHasMore, toLastPage, setLastPage 
} = paginationBarSlice.actions;

export const selectPage = state => state.paginationBar.page;
export const selectLastPage = state => state.paginationBar.lastPage;
export const selectHasMore = state => state.paginationBar.hasMore;

export default paginationBarSlice.reducer;