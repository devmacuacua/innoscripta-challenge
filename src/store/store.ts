import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from './preferencesReducer'

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch