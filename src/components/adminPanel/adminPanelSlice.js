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
  users: {
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  articles: {
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  topics: {
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  categories: {
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  admins: {
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  reports: {
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
};

export const getStatsAdmin = createAsyncThunk(
  'adminPanel/getStatsAdmin',
  async (user) => {
    const response = await data.getStatsAdmin(user);
    return response;
  }
)

export const getUsersAdmin = createAsyncThunk(
  'adminPanel/getUsersAdmin',
  async ({ user, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getUsersAdmin(user, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getUsersByQueryAdmin = createAsyncThunk(
  'adminPanel/getUsersByQueryAdmin',
  async ({ user, query = null, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getUsersByQueryAdmin(user, query, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getArticlesAdmin = createAsyncThunk(
  'adminPanel/getArticlesAdmin',
  async ({ user, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getArticlesAdmin(user, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getArticlesByQueryAdmin = createAsyncThunk(
  'adminPanel/getArticlesByQueryAdmin',
  async ({ user, query = null, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getArticlesByQueryAdmin(user, query, limit, page, sortColumn, sortOrder);
    return response;
  }
);

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
    builder.addCase(getUsersAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.users.entries = data.users;
        result.users.total = data.count;
        result.users.rangeStart = data.rangeStart;
        result.users.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getUsersByQueryAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.users.entries = data.users;
        result.users.total = data.count;
        result.users.rangeStart = data.rangeStart;
        result.users.rangeEnd = data.rangeEnd;
      };
      return result;
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