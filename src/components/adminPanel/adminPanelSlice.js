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

export const getStatsAdmin = createAsyncThunk(
  'adminPanel/getStatsAdmin',
  async (user) => {
    const response = await data.getStatsAdmin(user);
    return response;
  }
)

export const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getStatsAdmin.fulfilled, (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        stats: {
          total: data.total,
          new: data.new,
          reports: data.reports
        }
      }
    });
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