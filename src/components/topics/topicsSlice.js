import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Data from '../../Data'

const data = new Data()

const initialState = {
  categories: null,
  topics: null,
}

export const getCategories = createAsyncThunk('topics/getCategories', () => {
  const res = data.getCategories()
  return res
})

export const getTopics = createAsyncThunk('topics/getTopics', () => {
  const res = data.getTopics()
  return res
})

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      const res = action.payload
      if (res.status === 200) {
        return {
          ...state,
          categories: res.categories,
        }
      }
    })
    builder.addCase(getTopics.fulfilled, (state, action) => {
      const res = action.payload
      if (res.status === 200) {
        return {
          ...state,
          topics: res.topics,
        }
      }
    })
  },
})

export const selectCategories = (state) => state.topics.categories
export const selectTopics = (state) => state.topics.topics

export default topicsSlice.reducer
