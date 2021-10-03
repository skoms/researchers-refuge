import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../Data";

const data = new Data();
const initialState = { 
  sortOrder: { column: 'id', order: 'ASC' },
  entriesLimit: 5,
  searchQuery: '',
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
    type: 'users',
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  articles: {
    type: 'articles',
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  topics: {
    type: 'topics',
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  categories: {
    type: 'categories',
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  admins: {
    type: 'admins',
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  reports: {
    type: 'reports',
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
};

export const getSortImg = ( sortOrder ) => {
  const ascImg = <img src="https://img.icons8.com/material-outlined/20/FFFFFF/generic-sorting-2.png" alt='ascending filter'/>;
  const descImg = <img src="https://img.icons8.com/material-outlined/20/FFFFFF/generic-sorting.png" alt='descending filter'/>;
  
  return (
    ( sortOrder.order === 'ASC' && ascImg) || 
    ( sortOrder.order === 'DESC' && descImg)
  );
}

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
    updateEntriesLimit: (state, { payload }) => {
      const results = state;
      results.entriesLimit = payload;
      return results;
    },
    updateNewData: (state, { payload }) => {
      const { data, type, column } = payload;
      return { 
        ...state, 
        [type]:{ 
          ...state[type],
          newData: { 
            ...state[type].newData, 
            [column]: data
          }
        }
      }
    },
    updateSortOrder: (state, { payload }) => {
      const results = state;
      if (!payload) return { ...state, sortOrder: { column: 'id', order: 'ASC' }};
      const { column, order } = state.sortOrder;
      if (!column || column !== payload) {
        results.sortOrder = { column: payload, order: 'ASC' };
      } else if (column === payload) {
        results.sortOrder = { column: payload, order: order === 'ASC' ? 'DESC' : 'ASC' };
      }
      return results;
    },
    updateSearchQuery: (state, { payload }) => {
      const results = state;
      results.searchQuery = payload;
      return results;
    },
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
    builder.addCase(getArticlesAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.articles.entries = data.articles;
        result.articles.total = data.count;
        result.articles.rangeStart = data.rangeStart;
        result.articles.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getArticlesByQueryAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.articles.entries = data.articles;
        result.articles.total = data.count;
        result.articles.rangeStart = data.rangeStart;
        result.articles.rangeEnd = data.rangeEnd;
      };
      return result;
    });
  }
});

export const { updateSortOrder, updateEntriesLimit, updateSearchQuery, updateNewData } = adminPanelSlice.actions;

export const selectSortOrder = state => state.adminPanel.sortOrder;
export const selectEntriesLimit = state => state.adminPanel.entriesLimit;
export const selectSearchQuery = state => state.adminPanel.searchQuery;
export const selectStats = state => state.adminPanel.stats;
export const selectUsers = state => state.adminPanel.users;
export const selectArticles = state => state.adminPanel.articles;
export const selectTopics = state => state.adminPanel.topics;
export const selectCategories = state => state.adminPanel.categories;
export const selectAdmins = state => state.adminPanel.admins;
export const selectReports = state => state.adminPanel.reports;


export default adminPanelSlice.reducer;