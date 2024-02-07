import { useEffect, useState } from "react";
import "./articleContainer.css";
import { useParams } from "react-router-dom";
import { fetchIndividualArticle, options } from "../../utils/utils";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LabelIcon from "@mui/icons-material/Label";
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

  function handleLike() {
    if (!liked) {
      setDisliked(false);
      setVoted(+1);
    }
    setLiked(!liked);
    if (liked) {
      setVoted(0);
    }
  }

  function handleDislike() {
    if (!disliked) {
      setLiked(false);
      setVoted(-1);
    }
    setDisliked(!disliked);
    if (disliked) {
      setVoted(0);
    }
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
              mb: 3,
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
                <IconButton onClick={handleLike}>
                  {liked ? (
                    <ThumbUpIcon aria-label="liked" />
                  ) : (
                    <ThumbUpAltOutlinedIcon aria-label="like" />
                  )}
                </IconButton>
                <Typography>{articleContent.votes + voted}</Typography>
                <IconButton onClick={handleDislike}>
                  {disliked ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownAltOutlinedIcon aria-label="dislike" />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </Box>
          <CommentList id={article} />
        </>
      )}
    </>
  );
};
