import { useEffect, useState } from "react";
import "./ArticleContainer.css";
import { useParams } from "react-router-dom";
import { fetchIndividualArticle, options, patchArticleVotes } from "../../utils/utils";
import LabelIcon from "@mui/icons-material/Label";
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { CommentList } from "../Comment List/CommentList";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  CardHeader,
  Typography,
  IconButton,
  Stack,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Box,
  CircularProgress,
} from "@mui/material";

export const ArticleContainer = () => {
  const { article } = useParams();
  const [articleContent, setArticleContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [voted, setVoted] = useState(0);
  const [err, setErr] = useState(null);
  const [likeErr, setLikeErr] = useState(null)
  const [likeLoading, setLikeLoading] = useState(false)

  function handleLike() {
    if (!liked) {
      setDisliked(false);
      setLikeLoading(true);
      setVoted(1);
      patchArticleVotes(article, 1).then(() => {
        setLikeLoading(false);
      }).catch((error) => {
        console.log(error.message);
        setLikeErr(error.message);
      });
    } else {
      setVoted(0);
      patchArticleVotes(article, -1).then(() => {
        setLikeLoading(false);
      }).catch((error) => {
        console.log(error.message);
        setLikeErr(error.message);
      });

    }
    setLiked(!liked);
  }
  
  function handleDislike() {
    if (!disliked) {
      setLiked(false);
      setLikeLoading(true);
      setVoted(-1);
      patchArticleVotes(article, -1).then(() => {
        setLikeLoading(false);
      }).catch((error) => {
        console.log(error.message);
        setLikeErr(error.message);
      });
    } else {
      setVoted(0);
      patchArticleVotes(article, 1).then(() => {
        setLikeLoading(false);
      }).catch((error) => {
        console.log(error.message);
        setLikeErr(error.message);
      });
    }
    setDisliked(!disliked);
  }




  useEffect(() => {
    fetchIndividualArticle(article)
      .then(({ article }) => {
        setArticleContent(article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setErr(error.message);
      });
  }, [article]);

  if (err) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m:2
        }}
      >
        {" "}
        <Card sx={{ maxWidth: "80%" }}>
          <CardHeader title={err}></CardHeader>
        </Card>
      </Box>
    );
  }

  const articleDate = new Date(articleContent.created_at).toLocaleString(
    undefined,
    options
  );

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Loading</p>
          <CircularProgress />
        </Box>
      ) : (
        <>    
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 2,

            }}
          >
            <Card sx={{ maxWidth: "80%" }}>
              <CardMedia
                component="img"
                height="auto"
                sx={{ objectFit: "contain" }}
                image={articleContent.article_img_url}
                title={articleContent.title}
              />
              <CardContent>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <LabelIcon />
                  <Typography gutterBottom>{articleContent.topic}</Typography>
                </Stack>
              </CardContent>
              <CardHeader
                title={articleContent.title}
                subheader={`by: ${articleContent.author}`}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  {articleContent.body}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="right"
                >
                  Posted {articleDate}
                </Typography>
              </CardContent>
              <CardActions disableSpacing> 
              {likeErr ? <p>{likeErr}</p> : 
              (likeLoading ? <CircularProgress /> : <IconButton onClick={handleLike}>
              {liked ? (
                <ArrowCircleUpTwoToneIcon aria-label="liked" />
              ) : (
                <ArrowCircleUpOutlinedIcon  aria-label="like" />
              )}
            </IconButton>)}
            <Typography>{articleContent.votes + voted}</Typography>
            {likeErr ? <p>{likeErr}</p> : 
            (likeLoading ? <CircularProgress /> : <IconButton onClick={handleDislike}>
              {disliked ? (
                <ArrowCircleDownTwoToneIcon aria-label="disliked" />
              ) : (
                <ArrowCircleDownOutlinedIcon  aria-label="dislike" />
              )}
            </IconButton>)
            }
            </CardActions>
            </Card>
          </Box>
          <CommentList id={article} />
        </>
      )}
    </>
  );
};
