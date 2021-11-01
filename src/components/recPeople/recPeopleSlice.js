import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Data from '../../Data'

const data = new Data()

const initialState = {
  recPeople: null,
}

export const getRecPeople = createAsyncThunk(
  'recPeople/getRecPeople',
  async (user) => {
    const response = await data.getRecommendedUsers(user)
    return response
  },
)

export const recPeopleSlice = createSlice({
  name: 'recPeople',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecPeople.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        const { users } = action.payload
        return {
          ...state,
          recPeople: users,
        }
      }
    })
  },
})

export const selectRecPeople = (state) => state.recPeople.recPeople

export default recPeopleSlice.reducer
