import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Data from "../../Data";

const data = new Data();
const initialState = {  };

export const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  }
});

export default adminPanelSlice.reducer;