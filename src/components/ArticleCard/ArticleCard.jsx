import { Link } from "react-router-dom";
import "./ArticleCard.css";
import { options } from "../../utils/utils";
import { Typography } from "@mui/material";


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
          <span className="article-title"><Typography variant="h6">{article.title}</Typography></span>
          <span className="article-author"><Typography variant="subtitle2">By: {article.author}</Typography></span>
          <span className="article-comments"><Typography variant="subtitle2">Number of Comments: {article.comment_count}</Typography></span>
          <span className="article-topic"><Typography variant="subtitle2">Topic: {article.topic}</Typography></span>
          <span className="article-votes"><Typography variant="subtitle2">Upvotes: {article.votes}</Typography></span>
          <span className="article-date"><Typography variant="caption">Posted: {formattedDate}</Typography></span>
    </li>
    </Link>
  );
};
