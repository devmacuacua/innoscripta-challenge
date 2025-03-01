import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { format } from 'date-fns';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_API_KEY
  const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  useEffect(() => {
    axios
      .get(newsUrl)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching news');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>News Aggregator</h1>
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
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
