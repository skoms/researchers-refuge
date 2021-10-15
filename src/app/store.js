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
import recommendModuleReducer from '../components/recommendModule/recommendModuleSlice';
import recPeopleReducer from '../components/recPeople/recPeopleSlice';
import relatedArticlesReducer from '../components/article/articleDetails/relatedArticles/relatedArticlesSlice';
import screenWidthReducer from './screenWidthSlice';
import paginationBarReducer from '../components/paginationBar/paginationBarSlice';
import adminPanelReducer from '../components/adminPanel/adminPanelSlice';
import reportModuleReducer from '../components/reportModule/reportModuleSlice';

export const store = configureStore({
  reducer: {
    //TODO - Add all the reducers
    screenWidth: screenWidthReducer,
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
    recommendModule: recommendModuleReducer,
    recPeople: recPeopleReducer,
    relatedArticles: relatedArticlesReducer,
    paginationBar: paginationBarReducer,
    adminPanel: adminPanelReducer,
    reportModule: reportModuleReducer,
  }
});