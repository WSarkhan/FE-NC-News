import { useEffect, useState } from "react";
import "./HomePage.css";
import { fetchArticles } from "../../utils/utils";
import { ArticleList } from "../ArticleList/ArticleList";

export const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="HomePage">
      <ArticleList articles={articles} />
      {isLoading ? <p>Loading...</p> : null}
    </div>
  );
};
