import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Data from '../../Data'

const data = new Data()
const initialState = {
  recommendedTopics: null,
  recommendedArticles: null,
  recommendedUsers: null,
}

export const getRecommendedTopics = createAsyncThunk(
  'recommendModule/getRecommendedTopics',
  async (user) => {
    const response = await data.getRecommendedTopics(user)
    return response
  },
)

export const getRecommendedArticles = createAsyncThunk(
  'recommendModule/getRecommendedArticles',
  async (user) => {
    const response = await data.getRecommendedArticles(user)
    return response
  },
)

export const getRecommendedUsers = createAsyncThunk(
  'recommendModule/getRecommendedUsers',
  async (user) => {
    const response = await data.getRecommendedUsers(user)
    return response
  },
)

export const recommendModuleSlice = createSlice({
  name: 'recommendModule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecommendedTopics.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        return {
          ...state,
          recommendedTopics: action.payload.topics,
        }
      } else if (action.payload.status === 404) {
        return {
          ...state,
          recommendedTopics: [],
        }
      }
    })
    builder.addCase(getRecommendedArticles.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        return {
          ...state,
          recommendedArticles: action.payload.articles,
        }
      } else if (action.payload.status === 404) {
        return {
          ...state,
          recommendedArticles: [],
        }
      }
    })
    builder.addCase(getRecommendedUsers.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        return {
          ...state,
          recommendedUsers: action.payload.users,
        }
      } else if (action.payload.status === 404) {
        return {
          ...state,
          recommendedUsers: [],
        }
      }
    })
  },
})

export const selectRecommendedTopics = (state) =>
  state.recommendModule.recommendedTopics
export const selectRecommendedArticles = (state) =>
  state.recommendModule.recommendedArticles
export const selectRecommendedUsers = (state) =>
  state.recommendModule.recommendedUsers

export default recommendModuleSlice.reducer
