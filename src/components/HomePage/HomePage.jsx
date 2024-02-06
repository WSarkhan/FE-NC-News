
import { useEffect, useState } from "react";
import "./HomePage.css";
import { fetchArticles } from "../../utils/utils";
import { ArticleList } from "../ArticleList/ArticleList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
      {isLoading ? (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>Loading</p>
      <CircularProgress />
    </Box>)  : null}
    </div>
  );
};
