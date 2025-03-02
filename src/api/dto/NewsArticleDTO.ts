export default function transformNewsArticles(
  articles: any[], // Adjust with a more specific type if available
  sourceType: string
): any[] {

  return articles.map((article) => {
    let normalizedArticle = {
      source: null,
      author: null,
      title: null,
      description: '',
      category: '',
      url: null,
      image: null,
      publishedDate: null,
    };

    switch (sourceType) {
      case 'guardian':
        normalizedArticle.source = article.source?.name || "Guardian";
        normalizedArticle.author = article.fields?.byline || "No Author Provided";
        normalizedArticle.title = article.webTitle || "No Title Provided";
        normalizedArticle.description = "No description provided";
        normalizedArticle.category = article.sectionId
        normalizedArticle.url = article.webUrl || null;
        normalizedArticle.image = article.fields?.thumbnail || null;
        normalizedArticle.publishedDate = article.webPublicationDate || null;
        break;

      case 'nyt':
        normalizedArticle.source = article.source || "NYT";
        normalizedArticle.author = article.byline || "No Author Provided";
        normalizedArticle.title = article.title || "No Title Provided";
        normalizedArticle.description = article.abstract || "No description provided";
        normalizedArticle.category = article.subsection ? article.subsection : "No Category Provided";
        normalizedArticle.url = article.url || null;
        normalizedArticle.image = article.multimedia?.[0]?.url || null;
        normalizedArticle.publishedDate = article.published_date || null;
        break;

      case 'newsapi':
        normalizedArticle.source = article.source?.name || "NewsAPI";
        normalizedArticle.author = article.author || "No Author Provided";
        normalizedArticle.title = article.title || "No Title Provided";
        normalizedArticle.description = article.description || "No description provided";
        normalizedArticle.category = "No Category Provided";
        normalizedArticle.url = article.url || null;
        normalizedArticle.image = article.urlToImage || null;
        normalizedArticle.publishedDate = article.publishedAt || null;
        break;

      default:
        throw new Error("Unsupported source type");
    }

    return normalizedArticle;
  });
}
