import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Data from "../../Data";

const data = new Data();

const initialState = {
  filter: 'popular',
  topic: 'home',
  feedArticles: [  ],
}

//TODO - JUST TEMPORARY, Need to tailor the API more first (check project TODO)
//TODO - SET UP FILTER TO SORT THE ORDER OF THE ARTICLES
export const getFeedArticles = createAsyncThunk(
  'feed/getFeedArticles',
  async ({filter, topic = 'home'}) => {
    let response;
    if (topic === 'home') {
      response = await data.getArticles();
      return response;
    } else {
      response = await data.getTopicByName(topic);
      return {
        status: response.status,
        articles: response.topic.Articles
      }
    }
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload
      }
    },
    updateTopic: (state, action) => {
      Cookies.set('topic', action.payload);
      return {
        ...state,
        topic: action.payload
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

export const { updateFilter, updateTopic } = feedSlice.actions;

export const selectFilter = state => state.feed.filter;
export const selectTopic = state => state.feed.topic;
export const selectFeedArticles = state => state.feed.feedArticles;


export default feedSlice.reducer;