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
    columns: [
      { column: 'firstName', name: 'First Name', input: true },
      { column: 'lastName', name: 'Last Name', input: true },
      { column: 'emailAddress', name: 'E-mail', input: true },
      { column: 'accessLevel', name: 'Access Level', input: true },
      { column: 'createdAt', name: 'Created', input: false },
      { column: 'updatedAt', name: 'Last Updated', input: false },
      { column: 'blocked', name: 'Blocked', input: false }
    ],
    requiredColumns: [
      { column: 'firstName', name: 'First Name', needsTextArea: false },
      { column: 'lastName', name: 'Last Name', needsTextArea: false },
      { column: 'emailAddress', name: 'E-mail', needsTextArea: false },
      { column: 'accessLevel', name: 'Access Level', needsTextArea: false },
      { column: 'password', name: 'Password', needsTextArea: false },
    ],
    entries: [],
    newData: {},
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  articles: {
    type: 'articles',
    columns: [
      { column: 'title', name: 'Title', input: false },
      { column: 'topic', name: 'Topic', input: false },
      { column: 'userId', name: 'AuthorId', input: false },
      { column: 'published', name: 'Published', input: false },
      { column: 'credits', name: 'Credits', input: false },
      { column: 'createdAt', name: 'Created', input: false },
      { column: 'updatedAt', name: 'Last Updated', input: false },
      { column: 'blocked', name: 'Blocked', input: false }
    ],
    requiredColumns: [
      { column: 'title', name: 'Title', needsTextArea: false },
      { column: 'topic', name: 'Topic', needsTextArea: false },
      { column: 'intro', name: 'Intro', needsTextArea: true },
      { column: 'body', name: 'Body', needsTextArea: true },
      { column: 'tags', name: 'Tags', needsTextArea: true },
      { column: 'userId', name: 'AuthorId', needsTextArea: false },
      { column: 'published', name: 'Published', needsTextArea: false },
    ],
    newData: {},
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  topics: {
    type: 'topics',
    columns: [
      { column: 'name', name: 'Name', input: true },
      { column: 'categoryId', name: 'Category Id', input: true },
      { column: 'createdAt', name: 'Created', input: false },
      { column: 'updatedAt', name: 'Last Updated', input: false }
    ],
    requiredColumns: [
      { column: 'name', name: 'Name', needsTextArea: false },
      { column: 'categoryId', name: 'Category Id', needsTextArea: false },
      { column: 'relatedTags', name: 'Related Tags', needsTextArea: true },
    ],
    newData: {},
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  categories: {
    type: 'categories',
    columns: [
      { column: 'name', name: 'Name', input: true },
      { column: 'createdAt', name: 'Created', input: false },
      { column: 'updatedAt', name: 'Last Updated', input: false }
    ],
    requiredColumns: [
      { column: 'name', name: 'Name' }
    ],
    newData: {},
    entries: [],
    total: 0,
    rangeStart: 0,
    rangeEnd: 0
  },
  reports: {
    type: 'reports',
    columns: [
      { column: 'title', name: 'Title', input: true },
      { column: 'description', name: 'Description', input: true },
      { column: 'userId', name: 'Sender', input: false },
      { column: 'createdAt', name: 'Created', input: false },
      { column: 'updatedAt', name: 'Last Updated', input: false }
    ],
    requiredColumns: [
      { column: 'title', name: 'Title', needsTextArea: false },
      { column: 'description', name: 'Description', needsTextArea: true },
      { column: 'userId', name: 'Sender', needsTextArea: false },
    ],
    newData: {},
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

export const getTopicsAdmin = createAsyncThunk(
  'adminPanel/getTopicsAdmin',
  async ({ user, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getTopicsAdmin(user, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getTopicsByQueryAdmin = createAsyncThunk(
  'adminPanel/getTopicsByQueryAdmin',
  async ({ user, query = null, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getTopicsByQueryAdmin(user, query, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getCategoriesAdmin = createAsyncThunk(
  'adminPanel/getCategoriesAdmin',
  async ({ user, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getCategoriesAdmin(user, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getCategoriesByQueryAdmin = createAsyncThunk(
  'adminPanel/getCategoriesByQueryAdmin',
  async ({ user, query = null, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getCategoriesByQueryAdmin(user, query, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getReportsAdmin = createAsyncThunk(
  'adminPanel/getReportsAdmin',
  async ({ user, status = 'open', limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getReportsAdmin(user, status, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const getReportsByQueryAdmin = createAsyncThunk(
  'adminPanel/getReportsByQueryAdmin',
  async ({ user, status = 'open', query = null, limit = 10, page = 1, sortColumn = 'id', sortOrder = 'ASC' }) => {
    const response = await data.getReportsByQueryAdmin(user, status, query, limit, page, sortColumn, sortOrder);
    return response;
  }
);

export const createEntryAdmin = createAsyncThunk(
  'adminPanel/createEntryAdmin',
  async ({ user, type, body }) => {
    const response = await data.createEntryAdmin(user, type, body);
    return { ...response, type};
  }
);

export const updateEntryAdmin = createAsyncThunk(
  'adminPanel/updateEntryAdmin',
  async ({ user, type, id, body }) => {
    const response = await data.updateEntryAdmin(user, type, id, body);
    return { ...response, type, id};
  }
);

export const blockEntryAdmin = createAsyncThunk(
  'adminPanel/blockEntryAdmin',
  async ({ user, type, id }) => {
    const response = await data.blockEntryAdmin(user, type, id);
    return { ...response, type, id };
  }
)

export const deleteEntryAdmin = createAsyncThunk(
  'adminPanel/deleteEntryAdmin',
  async ({ user, type, id }) => {
    const response = await data.deleteEntryAdmin(user, type, id);
    return { ...response, type, id };
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
      const result = state;
      if ( payload.data === null ) {
        result[payload.type].newData = {};
      } else {
        const { data, type, column } = payload;
        result[type].newData[column] = data;
      }
      return result
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
    builder.addCase(getTopicsAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.topics.entries = data.topics;
        result.topics.total = data.count;
        result.topics.rangeStart = data.rangeStart;
        result.topics.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getTopicsByQueryAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.topics.entries = data.topics;
        result.topics.total = data.count;
        result.topics.rangeStart = data.rangeStart;
        result.topics.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getCategoriesAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.categories.entries = data.categories;
        result.categories.total = data.count;
        result.categories.rangeStart = data.rangeStart;
        result.categories.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getCategoriesByQueryAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.categories.entries = data.categories;
        result.categories.total = data.count;
        result.categories.rangeStart = data.rangeStart;
        result.categories.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getReportsAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.reports.entries = data.reports;
        result.reports.total = data.count;
        result.reports.rangeStart = data.rangeStart;
        result.reports.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(getReportsByQueryAdmin.fulfilled, (state, action) => { 
      const { status, data } = action.payload;
      let result = state;
      if (status === 200) {
        result.reports.entries = data.reports;
        result.reports.total = data.count;
        result.reports.rangeStart = data.rangeStart;
        result.reports.rangeEnd = data.rangeEnd;
      };
      return result;
    });
    builder.addCase(createEntryAdmin.fulfilled, (state, { payload }) => {
      const { status, data, type } = payload;
      let result = state;
      if (status === 201) {
        result[type].entries =  [...result[type].entries, data.entry];
      }
      return result;
    });
    builder.addCase(updateEntryAdmin.fulfilled, (state , { payload }) => {
      const { status, data, type, id } = payload;
      let result = state;
      if (status === 201) {
        const updatedIndex = result[type].entries.indexOf(result[type].entries.find( entry => entry.id === id ));
        result[type].entries[updatedIndex] = {
          ...result[type].entries[updatedIndex],
          ...data.entry
        }; 
      }
      return result;
    });
    builder.addCase(blockEntryAdmin.fulfilled, (state, { payload }) => {
      const { status, type, id, data } = payload;
      let result = state;
      if (status === 201) {
        const updatedIndex = result[type].entries.indexOf(result[type].entries.find( entry => entry.id === id ));
        result[type].entries[updatedIndex] = {
          ...result[type].entries[updatedIndex],
          ...data.entry
        }; 
      }
      return result;
    });
    builder.addCase(deleteEntryAdmin.fulfilled, (state, { payload }) => {
      const { status, type, id } = payload;
      let result = state;
      if (status === 204) {
        result[type].entries = result[type].entries.filter( entry => entry.id !== id );
      }
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