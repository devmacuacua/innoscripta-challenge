import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PreferencesState {
  source: string
  category: string
  author: string
}

const initialState: PreferencesState = {
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
        source: string
        category: string
        author: string
      }>
    ) => {
      const { source, category, author } = action.payload
      state.source = source
      state.category = category
      state.author = author
    },
  },
})

export const { updateFilters } = preferenceslice.actions

export default preferenceslice.reducer
