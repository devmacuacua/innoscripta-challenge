import { NewsArticle } from "../api/model/NewsArticleModel"
import { useAppSelector } from "../store/hooks"
import NewsCard from "./NewsCard"

interface NewsListProps {
    articles: NewsArticle[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
    const loading = useAppSelector((state) => state.newsArticles.loading)
    return (
        <div className="news-list">
            {articles?.map((article, index) => (
                <NewsCard key={index} article={article} />
            ))}
            {articles.length === 0 && !loading && <p> No data found</p>}
        </div>
    )
}

export default NewsList