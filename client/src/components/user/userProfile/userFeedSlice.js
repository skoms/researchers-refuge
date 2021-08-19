import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../Data";

const data = new Data();

const initialState = {
  owner: null,
  userArticles: null,
};

export const getUserInfo = createAsyncThunk(
  'userFeed/getUserInfo',
  async (id) => {
    const response = await data.getUserById(id);
    return response
  }
);

export const getUserArticles = createAsyncThunk(
  'userFeed/getUserArticles',
  async (id) => {
    const response = await data.getArticlesByOwnerId(id);
    return response
  }
);

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      return {
        ...state,
        owner: action.payload.user
      }
    });
    builder.addCase(getUserArticles.fulfilled, (state, action) => {
      return {
        ...state,
        userArticles: action.payload.articles
      }
    });
  }
});

export const selectOwner = state => state.userFeed.owner;
export const selectUserArticles = state => state.userFeed.userArticles;

export default userFeedSlice.reducer;
