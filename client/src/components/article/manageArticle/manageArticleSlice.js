import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../Data";

const data = new Data();

const initialState = {
  article: {
    title: null,
    intro: null,
    body: null,
    published: null,
    tags: null,
    topic: null,
  }
}

export const postArticle = createAsyncThunk(
  'manageArticle/postArticle',
  async ({article, user}) => {
    const response = await data.createArticle(article, user);
    return response;
  }
);

export const updateArticle = createAsyncThunk(
  'manageArticle/updateArticle',
  async ({article, id, user}) => {
    const response = await data.updateArticle(article, id, user);
    return response;
  }
);

export const getArticleIfOwner = createAsyncThunk(
  'manageArticle/getArticle',
  async ({id, userId}) => {
    const response = await data.getArticle(id);
    if ( response.article.userId === userId ){
      return response;
    } else {
      return { status: 401 }
    }
  }
);

export const manageArticleSlice = createSlice({
  name: 'manageArticle',
  initialState, 
  reducers: {
    updateArticleState: (state, { payload }) => {
      return {
        ...state,
        article: payload
      }
    },
    updateArticleStateByKey: (state, { payload }) => {
      return {
        ...state,
        article: {
          ...state.article,
          [payload.key]: payload.key !== 'tags' ? payload.value : [...payload.value.split(',')]
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticleIfOwner.fulfilled, (state, { payload }) => {
      if (payload.status === 200) {
        return {
          ...state,
          article: payload.article
        }
      }
    });
  }
});

export const selectArticle = state => state.manageArticle.article;
export const { updateStateArticle, updateArticleStateByKey } = manageArticleSlice.actions;

export default manageArticleSlice.reducer;