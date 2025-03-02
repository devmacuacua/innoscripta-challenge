import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from './preferences/preferencesReducer'
import newsArticlesReducer from './newsArticles/newsArticlesReducer'

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    newsArticles: newsArticlesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch