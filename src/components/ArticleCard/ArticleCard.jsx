import "./ArticleCard.css";

export const ArticleCard = ({ article }) => {
    
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
    
      const formattedDate = new Date(article.created_at).toLocaleString(
        undefined,
        options
      );
  return (
    <li className="card">
            <img
              src={article.article_img_url}
              alt={article.title}
            />
          <span className="article-title">{article.title}</span>
          <span className="article-author">{article.author}</span>
          <span className="article-comments">{article.comments}</span>
          <span className="article-topic">{article.topic}</span>
          <span className="article-votes">{article.votes}</span>
          <span className="article-date">{formattedDate}</span>
    </li>
  );
};
