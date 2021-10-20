import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Data from "../../utils/helpers/Data";

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
  async ({filter = null, topic = 'home', user = null, page = null}) => {
    if (filter === 'following' && user !== null) {
      const response = await data.getFollowingArticles(user, page);
      return response;
    } else if (topic === 'home') {
      const response = await data.getArticlesWithFilter(filter, page);
      return response;
    } else {
      const response = await data.getTopicByName(topic, filter, page);
      return {
        status: response.status,
        data: {
          ...response.data,
          articles: response.data.topic.Articles
        }
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
          feedArticles: action.payload.data.articles
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