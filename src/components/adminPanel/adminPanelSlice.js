import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../Data";

const data = new Data();
const initialState = { 
  stats: {
    total: {
      users: 0,
      articles: 0,
      admins: 0
    },
    new: {
      users: 0,
      articles: 0,
      admins: 0
    },
    reports: {
      open: 0,
      resolved: 0,
      rejected: 0
    },
  },
  users: [],
  articles: [],
  topics: [],
  categories: [],
  admins: [],
  reports: []
};

export const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  }
});

export const selectStats = state => state.adminPanel.stats;
export const selectUsers = state => state.adminPanel.users;
export const selectArticles = state => state.adminPanel.articles;
export const selectTopics = state => state.adminPanel.topics;
export const selectCategories = state => state.adminPanel.categories;
export const selectAdmins = state => state.adminPanel.admins;
export const selectReports = state => state.adminPanel.reports;

export default adminPanelSlice.reducer;