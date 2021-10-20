import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../../utils/helpers/Data";

const data = new Data();

const initialState = {
  relatedArticles: null,
}

export const getRelatedArticles = createAsyncThunk(
  'relatedArticles/getRelatedArticles',
  async ({ tags, id }) => {
    const response = await Promise.all(
      tags.map(tag => {
        return data.getArticlesByTag(tag, id)
          .then(res => { if (res.status === 200) return res.articles });
      })
    );
    const articles = [];
    response.forEach(array => {
      if ( array.length === 1 ) {
        if (!articles.find(entry => entry.id === array[0].id)) {
          articles.push(array[0]);
        }
      } else {
        array.forEach( article => {
          if (!articles.find(entry => entry.id === article.id)) {
            articles.push(article);
          }
        })
      }
    })
    if ( articles.length > 0 ) {
      return {
        status: 200,
        articles: articles
      }
    } else {
      return { status: 404 }
    }
  } 
);

export const relatedArticlesSlice = createSlice({
  name: 'relatedArticles',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getRelatedArticles.fulfilled, (state, action) => {
      if ( action.payload.status === 200 ) {
        return {
          ...state,
          relatedArticles: action.payload.articles
        }
      }
    });
  }
});

export const selectRelatedArticles = state => state.relatedArticles.relatedArticles;

export default relatedArticlesSlice.reducer;