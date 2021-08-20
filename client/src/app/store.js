import { configureStore } from '@reduxjs/toolkit';

//TODO - Import all the needed Reducers
import searchFieldReducer from '../components/searchField/searchFieldSlice';
import feedReducer from "../components/feed/FeedSlice";
import userAccReducer from '../components/user/userAccManage//userAccSlice';
import userFeedReducer from '../components/user/userProfile/userFeedSlice';

export const store = configureStore({
  reducer: {
    //TODO - Add all the reducers
    searchField: searchFieldReducer,
    feed: feedReducer,
    userAcc: userAccReducer,
    userFeed: userFeedReducer,
  }
});