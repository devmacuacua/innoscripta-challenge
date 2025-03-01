import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { format } from 'date-fns';

interface NewsArticle {
  source: { name: string };
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState('today');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sources, setSources] = useState<string[]>([]);

  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const newsUrl = `https://newsapi.org/v2/everything?q=${keyword}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`

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
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    const formatedYesterday = formatDate(yesterday);
    const formatedToday = formatDate(today);

    setFromDate(formatedYesterday)
    setToDate(formatedToday)

    if (keyword) {
      axios
        .get(newsUrl)
        .then((response) => {
          const articles = response.data.articles;
          setArticles(articles);
          setAllArticles(articles);
          const uniqueSources: string[] = Array.from(new Set(articles.map((article: NewsArticle) => article.source.name)));
          setSources(uniqueSources);
          setLoading(false);
        })
        .catch(() => {
          setError('Error fetching news');
          setLoading(false);
        });
    }
  }, [fromDate, toDate, debouncedKeyword]);

  const filterArticles = () => {
    let filtered = allArticles;

    if (keyword) {
      filtered = filtered.filter(article =>
        article.title?.toLowerCase().includes(keyword?.toLowerCase()) ||
        article.description?.toLowerCase().includes(keyword?.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (source) {
      filtered = filtered.filter(article => article.source.name === source);
    }

    if (fromDate) {
      filtered = filtered.filter(article => article.publishedAt.startsWith(fromDate));
    }

    setArticles(filtered);
  };

  useEffect(() => {
    filterArticles();
  }, [keyword, category, source, fromDate]);

  return (
    <div className="App">
      <h1>Innoscripta News Aggregator</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
        </select>

        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">All Sources</option>
          {sources.map(src => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="news-list">
          {articles.map((article, index) => (
            <div className="news-card" key={index}>
              <img src={article.urlToImage} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p className="published-date">
                Published on: {format(new Date(article.publishedAt), 'MMMM dd, yyyy HH:mm')}
              </p>
              <p><strong>Source:</strong> {article.source.name}</p>
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
