import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Data from "../../../Data";

const data = new Data();

const initialState = {
  status: 'idle',
  loggedIn: false,
  error: null,
  authenticatedUser: Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null
};

export const signIn = createAsyncThunk(
  'userAcc/signIn', 
  async ({ emailAddress, password }) => {
  const response = await data.getUser(emailAddress, password);
  if (response.status === 200) {
    const { user } = response;
    user.password = password;
    Cookies.set('authenticatedUser', JSON.stringify(user), { sameSite: 'Strict' });
  }
  return response;
});

export const signUp = createAsyncThunk(
  'userAcc/signUp', 
  async (user) => {
  const createRes = await data.createUser(user);
  if (createRes.status === 201) {
    const getRes = await data.getUser(user.emailAddress, user.password);
    if (getRes.status === 200) {
      Cookies.set('authenticatedUser', JSON.stringify({
        password: user.password,
        ...getRes.user
      }), { sameSite: 'Strict' });
      return {
        status: createRes.status,
        user: getRes.user
      };
    } else {
      throw new Error();
    }
  } else if (createRes.status === 400) {
    return createRes;
  } else {
    throw new Error();
  }
});

export const followUser = createAsyncThunk(
  'userAcc/followUser',
  async (id, user) => {
    const response = await data.followUnfollow(id, user);
    return response;
});

export const userAccSlice = createSlice({
  name: 'userAcc',
  initialState,
  reducers: {
    signOut: (state) => {
      Cookies.remove('authenticatedUser');
      return {
        ...state,
        loggedIn: false,
        authenticatedUser: null
      }
    },
    updateAccount: (state, action) => {
      const user = {
        ...state.authenticatedUser,
        ...action.payload,
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), { sameSite: 'Strict' });
      return {
        ...state,
        loggedIn: action.payload ? true : false,
        authenticatedUser: user
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { user } = action.payload;
      const followersArr = data.followStringToArray(user.followers);
      const followingArr = data.followStringToArray(user.following);
      return {
        ...state,
        loggedIn: user ? true : false,
        authenticatedUser: {
          ...user,
          followers: followersArr,
          following: followingArr
        }
      }
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      const { user } = action.payload;
      const followersArr = data.followStringToArray(user.followers);
      const followingArr = data.followStringToArray(user.following);
      return {
        ...state,
        loggedIn: user ? true : false,
        authenticatedUser: {
          ...user,
          followers: followersArr,
          following: followingArr
        }
      }
    });
  }
});

export const selectAuthenticatedUser = state => state.userAcc.authenticatedUser;
export const selectLoggedIn = state => state.userAcc.loggedIn;

export const { signOut, updateAccount } = userAccSlice.actions;

export default userAccSlice.reducer;
