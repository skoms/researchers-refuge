import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../Data";

const data = new Data();

const initialState = {
  owner: null,
  isFollowedByMe: null,
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
    updateIsFollowedByMe: (state, action) => {
      return {
        ...state,
        isFollowedByMe: action.payload
      }
    },
    updateOwner: (state, action) => {
      return {
        ...state,
        owner: {
          ...state.owner,
          ...action.payload
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const { user } = action.payload;
        const followersArr = data.followStringToArray(user.followers);
        const followingArr = data.followStringToArray(user.following);
        return {
          ...state,
          owner: {
            ...user,
            followers: followersArr,
            following: followingArr
          }
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

export const { updateIsFollowedByMe, updateOwner } = userFeedSlice.actions;

export const selectOwner = state => state.userFeed.owner;
export const selectIsFollowedByMe = state => state.userFeed.isFollowedByMe;
export const selectUserArticles = state => state.userFeed.userArticles;

export default userFeedSlice.reducer;
