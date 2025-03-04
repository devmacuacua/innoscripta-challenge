import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PreferencesState {
  keyword: string
  fromDate: string
  toDate: string
  source: string
  category: string
  author: string
}

const initialState: PreferencesState = {
  keyword: '',
  fromDate: '',
  toDate: '',
  source: '',
  category: '',
  author: '',
}

export const preferenceslice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    updateFilters: (
      state,
      action: PayloadAction<{
        keyword: string
        fromDate: string
        toDate: string
        source: string
        category: string
        author: string
      }>
    ) => {
      const { keyword, fromDate, toDate, source, category, author } = action.payload
      state.keyword = keyword
      state.fromDate = fromDate
      state.toDate = toDate
      state.source = source
      state.category = category
      state.author = author
    },
  },
})

export const { updateFilters } = preferenceslice.actions

export default preferenceslice.reducer
