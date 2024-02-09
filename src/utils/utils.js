import axios from 'axios'


const apiLink = axios.create({
  baseURL: "https://nc-news-6jgg.onrender.com/api/",
});

export const fetchArticles = (topic) => {
        return apiLink.get(`articles?topic=${topic}`).then(({data})=>{
            return data.articles
        })
    }


export const fetchIndividualArticle = (id) => {
    return apiLink
      .get(`articles/${id}`)
      .then(({ data }) => {
        return data;
      })
     
  };

  export const fetchCommentsbyArticle = (id) => {
    return apiLink
      .get(`articles/${id}/comments`)
      .then(({ data }) => {
        return data;
      })
     
  };

  export const patchArticleVotes = (id, vote) => {
    return apiLink.patch(`/articles/${id}`, { inc_votes: vote }).then(({ data }) => {
      return data;
    });
  };

  export const postNewComment = (id, {username}, comment) => {
   return apiLink.post(`/articles/${id}/comments`, {body: comment, username})
  }


export const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};


export const deleteComment = (id) => {
  return apiLink.delete(`/comments/${id}`).then((res) => {
    console.log(res);
  });
};

export const getTopics = () => {
  return apiLink.get("/topics").then(({ data }) => {
    return data;
  });
};