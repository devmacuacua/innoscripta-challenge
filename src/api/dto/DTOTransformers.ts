import { NewsArticle } from '../model/NewsArticleModel';
import { ntimes_base } from '../../utils/Constants';

export function transformGuardianArticle(article: any): NewsArticle {
    return {
        source : article.source?.name || "Guardian",
        author : article.fields?.byline || "No Author Provided",
        title : article.webTitle || "No Title Provided",
        description : "No description provided",
        category : article.sectionId,
        url : article.webUrl || null,
        image : article.fields?.thumbnail || null,
        publishedDate : article.webPublicationDate || null,
    };
}

export function transformNytArticle(article: any): NewsArticle {
    return {
        source : article.source || "NYT",
        author : article.byline.original || "No Author Provided",
        title : article.headline.main || "No Title Provided",
        description : article.abstract || "No description provided",
        category : article.subsection_name ? article.subsection_name : "No Category Provided",
        url : article.web_url || null,
        image : ntimes_base + article.multimedia?.[0]?.url,
        publishedDate : article.pub_date || null,
    };
}

export function transformNewsApiArticle(article: any): NewsArticle {
    return {
        source : article.source?.name || "NewsAPI",
        author : article.author || "No Author Provided",
        title : article.title || "No Title Provided",
        description : article.description || "No description provided",
        category : "No Category Provided",
        url : article.url || null,
        image : article.urlToImage || null,
        publishedDate : article.publishedAt || null,
    };
}
