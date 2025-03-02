import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsApiData, fetchNTimesData, fetchGuardianData } from "./newsArticlesActions";
import { NewsArticle } from "../../api/model/NewsArticleModel";

interface NewsArticlesState {
  allArticles: NewsArticle[];
  categories: string[];
  authors: string[];
  sources: string[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsArticlesState = {
  allArticles: [],
  categories: [],
  authors: [],
  sources: [],
  loading: false,
  error: null,
}

export const newsArticleslice = createSlice({
  name: 'newsArticles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // NewsAPI
    builder.addCase(fetchNewsApiData.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchNewsApiData.fulfilled, (state, action) => {
      state.loading = false
      state.allArticles = [...state.allArticles, ...action.payload]
      state.categories = Array.from(new Set(state.allArticles.map((article) => article.category).filter((category): category is string => category !== null)))
      state.authors = Array.from(new Set(state.allArticles.map((article) => article.author).filter((author): author is string => author !== null)))
      state.sources = Array.from(new Set(state.allArticles.map((article) => article.source).filter((source): source is string => source !== null)))
    })
    builder.addCase(fetchNewsApiData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // New York Times
    builder.addCase(fetchNTimesData.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchNTimesData.fulfilled, (state, action) => {
      state.loading = false
      state.allArticles = [...state.allArticles, ...action.payload]
      state.categories = Array.from(new Set(state.allArticles.map((article) => article.category).filter((category): category is string => category !== null)))
      state.authors = Array.from(new Set(state.allArticles.map((article) => article.author).filter((author): author is string => author !== null)))
      state.sources = Array.from(new Set(state.allArticles.map((article) => article.source).filter((source): source is string => source !== null)))
    })
    builder.addCase(fetchNTimesData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Guardian
    builder.addCase(fetchGuardianData.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchGuardianData.fulfilled, (state, action) => {
      state.loading = false
      state.allArticles = [...state.allArticles, ...action.payload]
      state.categories = Array.from(new Set(state.allArticles.map((article) => article.category).filter((category): category is string => category !== null)))
      state.authors = Array.from(new Set(state.allArticles.map((article) => article.author).filter((author): author is string => author !== null)))
      state.sources = Array.from(new Set(state.allArticles.map((article) => article.source).filter((source): source is string => source !== null)))
    })
    builder.addCase(fetchGuardianData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default newsArticleslice.reducer
