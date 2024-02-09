
import { useEffect, useState } from "react";
import "./HomePage.css";
import { fetchArticles } from "../../utils/utils";
import { ArticleList } from "../ArticleList/ArticleList";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { TopicList } from "../TopicList/TopicList";
import { Sort } from "../Sort/Sort";


export const HomePage = () => {
  
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null)
  const [topic, setTopic] = useState("")
  const [sortBy, setSortBy] = useState('created_at')
 
  
  useEffect(() => {
    if (topic && topic !== "All") {
      fetchArticles(topic, sortBy)
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErr(error.message);
        });
    } else {
      fetchArticles('',sortBy) 
        .then((data) => {
          setArticles(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErr(error.message);
        });
  }}, [topic, sortBy]);



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
    <>
      <Box sx={{ m:2, display: "flex",
          flexDirection: "row",
          justifyContent:"center", maxWidth: "90%"}}>
      <TopicList topic={topic} setTopic={setTopic}/>
      <Sort sortBy={sortBy} setSortBy={setSortBy}/>
      </Box>
    <div className="HomePage">
      <ArticleList articles={articles} />
      {isLoading ? (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>Loading</p>
      <CircularProgress />
    </Box>)  : null}
    </div>
    </>
  );
};
