import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkModeOn: localStorage.getItem('darkmode') === 'true',
}

export const darkModeButtonSlice = createSlice({
  name: 'darkModeButton',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      return {
        ...state,
        darkModeOn: state.darkModeOn === false,
      }
    },
  },
})

export const { toggleDarkMode } = darkModeButtonSlice.actions

export const selectDarkModeOn = (state) => state.darkModeButton.darkModeOn

export default darkModeButtonSlice.reducer
