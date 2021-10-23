import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../Data";

const data = new Data();

const initialState = {
  users: null,
  topics: null,
  articles: null,
}

export const getResults = createAsyncThunk(
  'searchResults/getResults',
  async ({query, page}) => {
    const response = {  };
    const cleanQuery = query.replace(/[$-/:-?{-~!"^_`[\]]/, '');
    response.users = await data.getUsersByQuery(cleanQuery, page);
    response.topics = await data.getTopicsByQuery(cleanQuery);
    response.articles = await data.getArticlesByQuery(cleanQuery, page);
    return response;
  } 
);

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {

  }, 
  extraReducers: (builder) => {
    builder.addCase(getResults.fulfilled, (state, action) => {
      const { users, topics, articles } = action.payload;
      let result = {
        ...state,
      }
      if (users.status === 200) result.users = users.users;
      if (topics.status === 200) result.topics = topics.topics;
      if (articles.status === 200) result.articles = articles.data.articles;
      return result;
    });
  }
});

export const selectUsersResults = state => state.searchResults.users;
export const selectTopicsResults = state => state.searchResults.topics;
export const selectArticlesResults = state => state.searchResults.articles;

export default searchResultsSlice.reducer;