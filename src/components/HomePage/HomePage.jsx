
import { useEffect, useState } from "react";
import "./HomePage.css";
import { fetchArticles } from "../../utils/utils";
import { ArticleList } from "../ArticleList/ArticleList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

export const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null)

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
      setIsLoading(false);
    }).catch((error)=>{
      setErr(error.message)
    })
  }, []);

  if (err) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      > <Card sx={{ maxWidth: "80%" }}>
        <CardHeader title={err}></CardHeader>
      </Card>
      </Box>
    );
  }


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
