import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: window.innerWidth
}

export const screenWidthSlice = createSlice({
  name: 'screenWidth',
  initialState,
  reducers: {
    updateWidth: (state) => {
      return {
        ...state,
        width: window.innerWidth
      }
    }
  }
});

export const selectScreenWidth = state => state.screenWidth.width;
export const { updateWidth } = screenWidthSlice.actions;

export default screenWidthSlice.reducer;