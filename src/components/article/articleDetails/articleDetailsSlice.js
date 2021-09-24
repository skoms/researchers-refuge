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
        const { article } = action.payload;
        const { User, published } = article;

        const formattedDate = data.formatDate(published);

        return {
          ...state,
          article: {
            ...article,
            published: formattedDate
          },
          author: {
            ...User,
            id: article.userId
          }
        }
      }
    });
  }
});

export const selectArticle = state => state.articleDetails.article;
export const selectAuthor = state => state.articleDetails.author;

export default articleDetailsSlice.reducer;