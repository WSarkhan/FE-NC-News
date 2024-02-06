import { ArticleCard } from "../ArticleCard/ArticleCard";
import "./ArticleList.css"

export const ArticleList = ({ articles }) => {


  return (
    <ul className='list-of-articles'>
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </ul>
  );
};
