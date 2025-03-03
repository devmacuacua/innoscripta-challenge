import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import transformArticles from '../../api/dto/DTOTransformersHub'

export const fetchNewsApiData = createAsyncThunk(
  'newsArticles/fetchNewsApiData',
  async (newsApiUrl: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(newsApiUrl)
      return transformArticles(response.data.articles, 'newsapi')
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn('Maximum queries exceeded for today, please upgrade newsAPI plan')
        return []
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
      return transformArticles(response.data.response.docs, 'nyt')
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn('Maximum queries exceeded for today, please upgrade NTimesAPI plan')
        return []
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
      return transformArticles(response.data.response.results, 'guardian')
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.warn('Maximum queries exceeded for today, please upgrade Guardian plan')
        return []
      }
      return rejectWithValue('Error fetching Guardian news')
    }
  }
)
