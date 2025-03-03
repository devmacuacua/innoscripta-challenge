import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { format } from 'date-fns';
import { updateFilters } from './store/preferences/preferencesReducer';
import { getGuardianapisUrl, getNewsUrl, getNTimesUrl } from './api/service/WebServices';
import { formatDate } from './utils/DateUtils'
import { fetchNewsApiData, fetchNTimesData, fetchGuardianData } from './store/newsArticles/newsArticlesActions';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { NewsArticle } from './api/model/NewsArticleModel';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const allArticles = useAppSelector((state) => state.newsArticles.allArticles)
  const categories = useAppSelector((state) => state.newsArticles.categories)
  const sources = useAppSelector((state) => state.newsArticles.sources)
  const authors = useAppSelector((state) => state.newsArticles.authors)
  const loading = useAppSelector((state) => state.newsArticles.loading)
  const error = useAppSelector((state) => state.newsArticles.error)

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [author, setAuthor] = useState('')

  const [key, setKey] = useState<string>("1")

  const dispatch = useAppDispatch()
  const preferencesSelector = useAppSelector((state) => state.preferences)

  const initPersonalizedFilters = async () => {
    const preferencesStr = localStorage.getItem("preferences")
    if (preferencesStr) {
      const preferences = JSON.parse(preferencesStr)
      dispatch(updateFilters({ source: preferences?.source, category: preferences?.category, author: preferences?.author }))
      setKey(key + 1)
    } else {
      console.log("No preferences found in localStorage")
    }
  }

  useEffect(() => {
    initPersonalizedFilters()
    setKeyword('today')
  }, [])

  const newsApiUrl = getNewsUrl(keyword, fromDate, toDate, process.env.REACT_APP_NEWSAPI_API_KEY);
  const nTimesUrl = getNTimesUrl(process.env.REACT_APP_NYTIMES_API_KEY);
  const guardianapisUrl = getGuardianapisUrl(keyword, fromDate, process.env.REACT_APP_GUARDIANAPIS_KEY);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  useEffect(() => {
    const today = new Date();
    const previousDay = new Date();

    previousDay.setDate(previousDay.getDate() - 7);
    const formatedYesterday = formatDate(previousDay);
    const formatedToday = formatDate(today);

    if (preferencesSelector) {
      setAuthor(preferencesSelector.author)
      setCategory(preferencesSelector.category)
      setSource(preferencesSelector.source)
    }
    setFromDate(formatedYesterday)
    setToDate(formatedToday)

    if (keyword && fromDate) {
      dispatch(fetchNewsApiData(newsApiUrl))
      dispatch(fetchNTimesData(nTimesUrl))
      dispatch(fetchGuardianData(guardianapisUrl))

      filterArticles()
    }
  }, [fromDate, toDate, debouncedKeyword, dispatch]);

  const filterArticles = () => {
    let filtered: NewsArticle[] = allArticles;

    if (keyword) {
      filtered = filtered.filter(article =>
        article.title?.toLowerCase().includes(keyword?.toLowerCase()) ||
        article.description?.toLowerCase().includes(keyword?.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(article => article.category === category);
    }

    if (source) {
      filtered = filtered.filter(article => article.source === source);
    }

    if (author) {
      filtered = filtered.filter(article => article.author === author);
    }

    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      filtered = filtered.filter(article => {
        const articleDate = new Date(article.publishedDate);
        return articleDate >= startDate && articleDate <= endDate;
      });
    }

    setArticles(filtered);
  };

  useEffect(() => {
    filterArticles();
  }, [keyword, category, source, author, fromDate]);

  const handleFavoriteFilterSave = () => {
    localStorage.setItem("preferences", JSON.stringify({ source, category, author }))
    dispatch(updateFilters({ source: source, category: category, author: author }))
  }

  const clearFilters = () => {
    setSource("")
    setCategory("")
    setAuthor("")
  }
  const handleFavoriteFilterReset = () => {
    localStorage.setItem("preferences", "")
    dispatch(updateFilters({ source: "", category: "", author: "" }))
    clearFilters();
  }

  useEffect(()=>{
    console.log("-----articles-----",articles)
  },[articles])

  return (
    <div className="App" id={key}>
      <h1>Innoscripta News Aggregator</h1>

      <div className="filters-container">
        <div className="filters-header">
          <h3>Search & Filters</h3>
        </div>

        <div className="filters-grid">
          <div className="filter-item">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search by keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(categ => (
                <option key={categ} value={categ}>{categ}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Author:</label>
            <select value={author} onChange={(e) => setAuthor(e.target.value)}>
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Source:</label>
            <select value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="">All Sources</option>
              {sources.map(src => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button onClick={handleFavoriteFilterSave}>Save as preferred</button>
            <button onClick={handleFavoriteFilterReset}>Reset preferences</button>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="news-list">
          {articles?.map((article, index) => (
            <div className="news-card" key={index}>
              <img src={article.image} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p className="published-date">
                Published on: {format(new Date(article.publishedDate), 'MMMM dd, yyyy HH:mm')}
              </p>
              <div>
                <p ><strong>Author:</strong> {article.author}</p>
                <p className="credits"><strong>Category:</strong> {article.category}</p>
                <p className="credits"><strong>Source:</strong> {article.source}</p>
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
          {articles.length === 0 && !loading && <p> No data found</p>}
        </div>
      )}
    </div>
  );
};

export default App;
