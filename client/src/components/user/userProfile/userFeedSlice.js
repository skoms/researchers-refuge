import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../../Data";
import { followUser } from "../userAccManage/userAccSlice";

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
      const user = action.payload;
      const followersArr = data.isStringAndFollowStringToArray(user.followers);
      const followingArr = data.isStringAndFollowStringToArray(user.following);
      return {
        ...state,
        owner: {
          ...user,
          followers: followersArr,
          following: followingArr
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const { user } = action.payload;
        const followersArr = data.isStringAndFollowStringToArray(user.followers);
        const followingArr = data.isStringAndFollowStringToArray(user.following);
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
    builder.addCase(followUser.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const user = action.payload.users.target;
        if (user.id === state.owner.id) {
          const followersArr = data.isStringAndFollowStringToArray(user.followers);
          const followingArr = data.isStringAndFollowStringToArray(user.following);
          return {
            ...state,
            owner: {
              ...user,
              followers: followersArr,
              following: followingArr
            }
          }
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
