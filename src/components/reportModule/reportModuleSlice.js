import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Data from '../../utils/helpers/Data';

const data = new Data();

const initialState = {
  type: '',
  targetId: 0,
  isActive: false,
  errors: []
}

export const createReport = createAsyncThunk(
  'reportModule/createReport',
  async ({ report, user }) => {
    const response = await data.createReport(report, user);
    return response;
  }
);

const reportModuleSlice = createSlice({
  name: 'reportModule',
  initialState,
  reducers: {
    updateType: (state, { payload }) => {
      const result = state;
      result.type = payload;
      return result;
    },
    updateTargetId: (state, { payload }) => {
      const result = state;
      result.targetId = payload;
      return result;
    },
    toggleIsActive: (state, { payload }) => {
      const result = state;
      result.isActive = payload !== undefined ? payload : !state.isActive;
      return result;
    },
    updateErrors: (state, { payload }) => {
      const result = state;
      result.errors = payload;
      return result;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createReport.fulfilled, (state, { payload }) => {
      const result = state;
      if ( payload.status === 204 ) { 
        result.errors = [];
        result.isActive = false;
      }
      if ( payload.status === 400 ) result.errors = payload.errors;
      return result;
    });
  }
});

export const { updateType, updateTargetId, toggleIsActive, updateErrors } = reportModuleSlice.actions;

export const selectType = state => state.reportModule.type;
export const selectTargetId = state => state.reportModule.targetId;
export const selectIsActive = state => state.reportModule.isActive;
export const selectErrors = state => state.reportModule.errors;

export default reportModuleSlice.reducer;