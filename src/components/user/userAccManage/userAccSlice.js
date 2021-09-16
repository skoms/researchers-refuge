import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Data from "../../../Data";

import { accreditDiscredit } from "../../article/articleCards/articleCardsSlice";

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
    if (response.status === 200) {
      return response;
    } else {
      return {
        status: response.status
      }
    }
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
      if ( action.payload === null ) {
        return {
          ...state,
          loggedIn: action.payload ? true : false,
          authenticatedUser: null
        }
      } else {
        const user = {
          ...state.authenticatedUser,
          ...action.payload,
          followers: data.isStringAndStringToArray(action.payload.followers),
          following: data.isStringAndStringToArray(action.payload.following),
          accreditedArticles: data.isStringAndStringToArray(action.payload.accreditedArticles),
          discreditedArticles: data.isStringAndStringToArray(action.payload.discreditedArticles)
        };
        Cookies.set('authenticatedUser', JSON.stringify(user), { sameSite: 'Strict' });
        return {
          ...state,
          loggedIn: action.payload ? true : false,
          authenticatedUser: user
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const { user } = action.payload;
        return {
          ...state,
          loggedIn: user ? true : false,
          authenticatedUser: {
            ...user,
            followers: data.isStringAndStringToArray(user.followers),
            following: data.isStringAndStringToArray(user.following),
            accreditedArticles: data.isStringAndStringToArray(user.accreditedArticles),
            discreditedArticles: data.isStringAndStringToArray(user.discreditedArticles)
          }
        }
      }
      
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action.payload.status === 201) {
        const { user } = action.payload;
        return {
          ...state,
          loggedIn: user ? true : false,
          authenticatedUser: {
            ...user,
            followers: data.isStringAndStringToArray(user.followers),
            following: data.isStringAndStringToArray(user.following),
            accreditedArticles: data.isStringAndStringToArray(user.accreditedArticles),
            discreditedArticles: data.isStringAndStringToArray(user.discreditedArticles)
          }
        }
      }
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const updatedUser = action.payload.users.user;
        const user = {
          ...state.authenticatedUser,
          ...updatedUser,
          followers: data.isStringAndStringToArray(updatedUser.followers),
          following: data.isStringAndStringToArray(updatedUser.following),
          accreditedArticles: data.isStringAndStringToArray(updatedUser.accreditedArticles),
          discreditedArticles: data.isStringAndStringToArray(updatedUser.discreditedArticles)
        };
        Cookies.set('authenticatedUser', JSON.stringify(user), { sameSite: 'Strict' });
        return {
          ...state,
          loggedIn: action.payload ? true : false,
          authenticatedUser: user
        }
      }
    });
    builder.addCase(accreditDiscredit.fulfilled, (state, action) => {
      const { status } = action.payload;
      if (status === 200) {
        const { user } = action.payload.data;
        const updatedUser = {
          ...state.authenticatedUser,
          ...user,
          accreditedArticles: data.isStringAndStringToArray(user.accreditedArticles),
          discreditedArticles: data.isStringAndStringToArray(user.discreditedArticles)
        };
        Cookies.set('authenticatedUser', JSON.stringify(updatedUser), { sameSite: 'Strict' });
        return {
          ...state,
          authenticatedUser: updatedUser
        }
      }
    });
  }
});

export const selectAuthenticatedUser = state => state.userAcc.authenticatedUser;
export const selectLoggedIn = state => state.userAcc.loggedIn;

export const { signOut, updateAccount } = userAccSlice.actions;

export default userAccSlice.reducer;
