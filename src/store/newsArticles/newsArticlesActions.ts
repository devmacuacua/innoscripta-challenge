import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import transformNewsArticles from '../../api/dto/NewsArticleDTO'

export const fetchNewsApiData = createAsyncThunk(
  'newsArticles/fetchNewsApiData',
  async (newsApiUrl: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(newsApiUrl)
      return transformNewsArticles(response.data.articles, 'newsapi')
    } catch (error: any) {
      if (error.response?.status === 429) {
        return rejectWithValue('Maximum queries exceeded for today, please upgrade newsAPI plan')
      }
      return rejectWithValue('Error fetching news api')
    }
  }
)

export const fetchNTimesData = createAsyncThunk(
  'newsArticles/fetchNTimesData',
  async (nTimesUrl: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(nTimesUrl)
      return transformNewsArticles(response.data.results, 'nyt')
    } catch (error: any) {
      if (error.response?.status === 429) {
        return rejectWithValue('Maximum queries exceeded for today, please upgrade NTimesAPI plan')
      }
      return rejectWithValue('Error fetching NYT news')
    }
  }
)

export const fetchGuardianData = createAsyncThunk(
  'newsArticles/fetchGuardianData',
  async (guardianapisUrl: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(guardianapisUrl)
      return transformNewsArticles(response.data.response.results, 'guardian')
    } catch (error: any) {
      if (error.response?.status === 429) {
        return rejectWithValue('Maximum queries exceeded for today, please upgrade Guardian plan')
      }
      return rejectWithValue('Error fetching Guardian news')
    }
  }
)
