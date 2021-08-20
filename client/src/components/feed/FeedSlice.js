import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Data from "../../Data";

const data = new Data();

//TODO - JUST TEMPORARY, Need to tailor the API more first (check project TODO)
export const getFeedArticles = createAsyncThunk(
  'feed/getFeedArticles',
  async (filter) => {
    const response = await data.getArticles();

    return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    filter: 'popular',
    feedArticles: [  ],
  },
  reducers: {
    updateFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedArticles.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        return {
          ...state,
          feedArticles: action.payload.articles
        }
      } else {
        return {
          ...state
        }
      }
    });
  }
});

export const { updateFilter } = feedSlice.actions;

export const selectFilter = state => state.feed.filter;
export const selectFeedArticles = state => state.feed.feedArticles;


export default feedSlice.reducer;