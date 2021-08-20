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
      if (action.payload.status === 200) {
        return {
          ...state,
          owner: {
            ...action.payload.user,
            followers: action.payload.user.followers.split(','),
            following: action.payload.user.following.split(',')
          }
        }
      } else {
        return {
          ...state
        }
      }
    });
    builder.addCase(getUserArticles.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        return {
          ...state,
          userArticles: action.payload.articles
        }
      } else {
        return {
          ...state
        }
      }
    });
  }
});

export const selectOwner = state => state.userFeed.owner;
export const selectUserArticles = state => state.userFeed.userArticles;

export default userFeedSlice.reducer;
