import { configureStore } from '@reduxjs/toolkit';

//TODO - Import all the needed Reducers
import searchFieldReducer from '../components/searchField/searchFieldSlice';
import feedReducer from "../components/feed/feedSlice";
import userAccReducer from '../components/user/userAccManage//userAccSlice';
import userFeedReducer from '../components/user/userProfile/userFeedSlice';
import darkModeButtonReducer from "../components/darkmodeButton/darkModeButtonSlice";
import articleDetailsReducer from '../components/article/articleDetails/articleDetailsSlice';
import topicsReducer from '../components/topics/topicsSlice';
import searchResultsReducer from '../components/searchResults/searchResultsSlice';
import manageArticleReducer from '../components/article/manageArticle/manageArticleSlice';
import articleCardsReducer from '../components/article/articleCards/articleCardsSlice';


export const store = configureStore({
  reducer: {
    //TODO - Add all the reducers
    searchField: searchFieldReducer,
    feed: feedReducer,
    userAcc: userAccReducer,
    userFeed: userFeedReducer,
    darkModeButton: darkModeButtonReducer,
    articleDetails: articleDetailsReducer,
    manageArticle: manageArticleReducer,
    topics: topicsReducer,
    searchResults: searchResultsReducer,
    articleCards: articleCardsReducer,
  }
});