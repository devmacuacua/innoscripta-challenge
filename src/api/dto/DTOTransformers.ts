import { NewsArticle } from '../model/NewsArticleModel';

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
        author : article.byline || "No Author Provided",
        title : article.title || "No Title Provided",
        description : article.abstract || "No description provided",
        category : article.subsection ? article.subsection : "No Category Provided",
        url : article.url || null,
        image : article.multimedia?.[0]?.url || null,
        publishedDate : article.published_date || null,
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
