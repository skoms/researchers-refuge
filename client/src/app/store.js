import { configureStore } from '@reduxjs/toolkit';

//TODO - Import all the needed Reducers
import searchFieldReducer from '../components/searchField/searchFieldSlice';

export const store = configureStore({
  reducer: {
    //TODO - Add all the reducers
    searchField: searchFieldReducer
  }
});