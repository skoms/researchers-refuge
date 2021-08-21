import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../Data";

const data = new Data();

const initialState = {
  article: null,
  author: null
}

export const getArticleInfo = createAsyncThunk(
  'articleDetails',
  async (id) => {
    const response = await data.getArticle(id);
    return response;
  }
);

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getArticleInfo.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        return {
          ...state,
          article: action.payload.article,
          author: {
            ...action.payload.article.User,
            id: action.payload.article.userId,
            followers: action.payload.article.User.followers.split(',').filter(entry => entry !== ' '),
            following: action.payload.article.User.following.split(',').filter(entry => entry !== ' ')
          }
        }
      }
    });
  }
});

export const selectArticle = state => state.articleDetails.article;
export const selectAuthor = state => state.articleDetails.author;

export default articleDetailsSlice.reducer;