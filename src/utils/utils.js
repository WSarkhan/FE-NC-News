import axios from 'axios'

export const apiLink = "https://nc-news-6jgg.onrender.com/api/"

export const fetchArticles = (categories = "all") => {

    if (categories === 'all') {

        return axios.get(apiLink+ "articles").then(({data})=>{
            return data.articles
        }).catch((error)=>{
            console.log("error fetching data", error)
        })
    }
}
