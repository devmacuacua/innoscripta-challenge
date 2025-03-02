const getNewsUrl = (keyword: string, fromDate: string, toDate: string, apiKey:any) => {
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${keyword}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}`
    return newsApiUrl
}

const getNTimesUrl = (apiKey:any) => {
    const nytimesUrl = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`
    return nytimesUrl
}

const getGuardianapisUrl = (keyword: string, fromDate: string, apiKey:any) => {
    const guardianapisUrl = `https://content.guardianapis.com/search?q=${keyword}&tag=politics/politics&from-date=${fromDate}&api-key=${apiKey}`
    return guardianapisUrl
}

export { getNewsUrl, getNTimesUrl, getGuardianapisUrl }