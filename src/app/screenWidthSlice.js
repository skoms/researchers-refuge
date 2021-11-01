import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  width: window.innerWidth,
  isMobile: window.innerWidth <= 768,
}

export const screenWidthSlice = createSlice({
  name: 'screenWidth',
  initialState,
  reducers: {
    updateWidth: (state) => {
      return {
        ...state,
        width: window.innerWidth,
        isMobile: window.innerWidth <= 768,
      }
    },
  },
})

export const selectScreenWidth = (state) => state.screenWidth.width
export const selectIsMobile = (state) => state.screenWidth.isMobile
export const { updateWidth } = screenWidthSlice.actions

export default screenWidthSlice.reducer
