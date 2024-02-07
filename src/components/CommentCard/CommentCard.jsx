
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LabelIcon from "@mui/icons-material/Label";
import { useState } from "react";
import { options } from "../../utils/utils";
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

export const CommentCard = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [voted, setVoted] = useState(0);

  const commentDate = new Date(comment.created_at).toLocaleString(
    undefined,
    options
  );

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
  return (
    <>
     <Paper style={{ padding: "20px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.author}</h4>
            <p style={{ textAlign: "left" }}>
              {comment.body} {" "}
            </p>
          </Grid>
        </Grid>
        <CardActions disableSpacing>
            <IconButton onClick={handleLike}>
              {liked ? (
                <ThumbUpIcon aria-label="liked" />
              ) : (
                <ThumbUpAltOutlinedIcon aria-label="like" />
              )}
            </IconButton>
            <Typography>{comment.votes + voted}</Typography>
            <IconButton onClick={handleDislike}>
              {disliked ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownAltOutlinedIcon aria-label="dislike" />
              )}
            </IconButton>
            <Typography variant="body2" color="text.secondary" align="right">
              Posted {commentDate}
            </Typography>
          </CardActions>
      </Paper>
    </>
  );
};
