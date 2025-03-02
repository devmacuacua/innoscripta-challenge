import { NewsArticle } from "../model/NewsArticleModel";
import {transformGuardianArticle, transformNewsApiArticle, transformNytArticle} from './DTOTransformers'

const sourceTransformers: Record<string, (article: any) => NewsArticle> = {
    guardian: transformGuardianArticle,
    nyt: transformNytArticle,
    newsapi: transformNewsApiArticle,
};

export default function transformArticles(articles: any[], sourceType: string): NewsArticle[] {
    const transformer = sourceTransformers[sourceType];

    if (!transformer) {
        throw new Error(`Unsupported source type: ${sourceType}`);
    }

    return articles.map(transformer);
}
