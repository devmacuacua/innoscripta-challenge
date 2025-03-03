const getNewsUrl = (keyword: string, fromDate: string, toDate: string, apiKey: any) => {
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${keyword}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}`
    return newsApiUrl
}

const getNTimesUrl = (keyword: string, fromDate: string, toDate: string, apiKey: any) => {
    const nytimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&begin_date=${fromDate}&end_date=${toDate}&api-key=${apiKey}`
    return nytimesUrl
}

const getGuardianapisUrl = (keyword: string, fromDate: string, toDate: string, apiKey: any) => {
    const guardianapisUrl = `https://content.guardianapis.com/search?q=${keyword}&tag=politics/politics&from-date=${fromDate}&to-date=${toDate}&api-key=${apiKey}`
    return guardianapisUrl
}

export { getNewsUrl, getNTimesUrl, getGuardianapisUrl }