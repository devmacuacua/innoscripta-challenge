import { format } from "date-fns"
import { NewsArticle } from "../api/model/NewsArticleModel"

interface NewsCardProps {
    article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <div className="news-card">
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
    )
}

export default NewsCard