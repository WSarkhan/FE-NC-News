import { Link } from "react-router-dom";
import "./ArticleCard.css";
import { options } from "../../utils/utils";


export const ArticleCard = ({ article }) => {
    
    
      const formattedDate = new Date(article.created_at).toLocaleString(
        undefined,
        options
      );

  return (
    <Link to={`/articles/${article.article_id}`} className="link-article">
    <li className="card">
            <img
              src={article.article_img_url}
              alt={article.title}
            />
          <span className="article-title">{article.title}</span>
          <span className="article-author">By: {article.author}</span>
          <span className="article-comments">Number of Comments: {article.comments}</span>
          <span className="article-topic">Topic: {article.topic}</span>
          <span className="article-votes">Upvotes: {article.votes}</span>
          <span className="article-date">Posted: {formattedDate}</span>
    </li>
    </Link>
  );
};
