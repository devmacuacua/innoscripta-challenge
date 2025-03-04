import { useEffect, useState } from "react";
import FiltersContainer from "../components/FiltersContainer";
import NewsList from "../components/NewsList";
import { fetchGuardianData, fetchNewsApiData, fetchNTimesData } from "../store/newsArticles/newsArticlesActions";
import { NewsArticle } from "../api/model/NewsArticleModel";
import { formatMyDate } from "../utils/DateUtils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getGuardianapisUrl, getNewsUrl, getNTimesUrl } from "../api/service/WebServices";

const NewsPage = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const allArticles = useAppSelector((state) => state.newsArticles.allArticles)
    const loading = useAppSelector((state) => state.newsArticles.loading)
    const error = useAppSelector((state) => state.newsArticles.error)

    const [keyword, setKeyword] = useState('News');
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

    const dispatch = useAppDispatch()
    const preferencesSelector = useAppSelector((state) => state.preferences)

    const newsApiUrl = getNewsUrl(keyword, fromDate, toDate, process.env.REACT_APP_NEWSAPI_API_KEY);
    const nTimesUrl = getNTimesUrl(keyword, fromDate, toDate, process.env.REACT_APP_NYTIMES_API_KEY);
    const guardianapisUrl = getGuardianapisUrl(keyword, toDate, fromDate, process.env.REACT_APP_GUARDIANAPIS_KEY);

    useEffect(() => {
        if (preferencesSelector) {
            preferencesSelector.keyword && setKeyword(preferencesSelector.keyword)
            preferencesSelector.fromDate && setFromDate(preferencesSelector.fromDate)
            preferencesSelector.toDate && setToDate(preferencesSelector.toDate)
            preferencesSelector.author && setAuthor(preferencesSelector.author)
            preferencesSelector.category && setCategory(preferencesSelector.category)
            preferencesSelector.source && setSource(preferencesSelector.source)
        }
    }, [preferencesSelector])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [keyword]);

    const initData = () => {
        const today = new Date();

        const previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 10);

        const formatedStartDay = formatMyDate(previousDay);
        const formatedEndToday = formatMyDate(today);

        if (!fromDate) {
            setFromDate(formatedStartDay)
        }

        if (!toDate) {
            setToDate(formatedEndToday)
        }

        if (keyword && fromDate) {
            dispatch(fetchNewsApiData(newsApiUrl))
            dispatch(fetchNTimesData(nTimesUrl))
            dispatch(fetchGuardianData(guardianapisUrl))

            filterArticles()
        }
    }
    useEffect(() => {
        initData()
    }, [debouncedKeyword, fromDate, toDate]);

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
        setArticles(filtered);
    };

    useEffect(() => {
        filterArticles();
    }, [category, source, author]);

    return (<>
        <h1>Innoscripta News Aggregator</h1>
        <FiltersContainer keyword={keyword} author={author} category={category} fromDate={fromDate} toDate={toDate} source={source} setKeyword={setKeyword} setCategory={setCategory} setFromDate={setFromDate} setToDate={setToDate} setAuthor={setAuthor} setSource={setSource} />
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <NewsList articles={articles} />
        )}</>
    )
}

export default NewsPage