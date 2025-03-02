import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsApiData, fetchNTimesData, fetchGuardianData } from "./newsArticlesActions";

interface Article {
  source: string;
  category: string;
  author: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedDate: string;
}

interface NewsArticlesState {
  allArticles: Article[];
  categories: string[];
  authors: string[];
  sources: string[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsArticlesState = {
  allArticles: [],
  categories: [],
  authors:[],
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
      state.categories = Array.from(new Set(state.allArticles.map((article) => article.category)))
      state.authors = Array.from(new Set(state.allArticles.map((article) => article.author)))
      state.sources = Array.from(new Set(state.allArticles.map((article) => article.source)))
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
      state.categories = Array.from(new Set(state.allArticles.map((article) => article.category)))
      state.authors = Array.from(new Set(state.allArticles.map((article) => article.author)))
      state.sources = Array.from(new Set(state.allArticles.map((article) => article.source)))
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
      state.categories = Array.from(new Set(state.allArticles.map((article) => article.category)))
      state.authors = Array.from(new Set(state.allArticles.map((article) => article.author)))
      state.sources = Array.from(new Set(state.allArticles.map((article) => article.source)))
    })
    builder.addCase(fetchGuardianData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default newsArticleslice.reducer
