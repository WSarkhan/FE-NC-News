import axios from 'axios'


export const apiLink = "https://nc-news-6jgg.onrender.com/api/"

export const fetchArticles = (categories = "all") => {

    if (categories === 'all') {

        return axios.get(apiLink+ "articles").then(({data})=>{
            return data.articles
        })
    }
}

export const fetchIndividualArticle = (id) => {
    return axios
      .get(apiLink+`articles/${id}`)
      .then(({ data }) => {
        return data;
      })
     
  };

  export const fetchCommentsbyArticle = (id) => {
    return axios
      .get(apiLink+`articles/${id}/comments`)
      .then(({ data }) => {
        return data;
      })
     
  };


export const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};


