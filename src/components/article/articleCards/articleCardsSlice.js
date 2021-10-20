import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../utils/helpers/Data";

const data = new Data();
const initialState = {
  articles: null,
}

export const accreditDiscredit = createAsyncThunk(
  'articleCards/accreditDiscredit',
  async ({id, user, credit}) => {
    const response = await data.accreditDiscredit(id, user, credit);
    return response;
  }
);

export const articleCardsSlice = createSlice({
  name: 'articleCards',
  initialState,
  reducers: {
    updateArticles: (state, action) => {
      return {
        ...state,
        articles: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(accreditDiscredit.fulfilled, (state, action) => {
      const { status } = action.payload;
      if (status === 200) {
        const { article } = action.payload.data;
        const articleIndex = state.articles.findIndex((entry) => entry.id === article.id);
        const updatedArticles = [ ...state.articles ];
        updatedArticles[articleIndex] = {
          ...updatedArticles[articleIndex],
          ...article,
        };
        return {
          ...state,
          articles: updatedArticles
        }
      }
    });
  }
});

export const selectArticles = state => state.articleCards.articles;
export const { updateArticles } = articleCardsSlice.actions;
export default articleCardsSlice.reducer;