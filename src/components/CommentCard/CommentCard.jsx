import "./CommentCard.css";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import CloseIcon from '@mui/icons-material/Close'

import { useContext, useEffect, useState } from "react";
import { deleteComment, options } from "../../utils/utils";
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
  Button,
  Alert,
  Collapse,
  List,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";

export const CommentCard = ({ comment, id }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [voted, setVoted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = useContext(UserContext)
  const [deleted, setDeleted] = useState(false)
  const [open, setOpen] =useState(true)
  const [err, setErr] =useState(null)

  const commentDate = new Date(comment.created_at).toLocaleString(
    undefined,
    options
  );
   function handleDelete() {
    setIsLoading(true)
    deleteComment(comment.comment_id).then(()=>{
      setDeleted(true)
      setIsLoading(false)
    }).catch((err)=>{
      setErr("Oh no! Your comment wasn't deleted! Please try again later!")
    })

   }

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
    (err ? <Collapse sx={{maxWidth:"80%"}} in={open} >
    <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ m: 1}}
        >{err}</Alert>
        </Collapse>: 
    (isLoading ?  <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Loading</p>
      <CircularProgress />
    </Box> : 
    (deleted ? 
    <Collapse sx={{maxWidth:"80%"}} in={open} >
    <Alert severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ m: 1}}
        >Comment deleted</Alert>
        </Collapse>
        :
      <Paper
        style={{ padding: "20px 0", marginTop: 10 }}
        className="card"
        sx={{ maxWidth: "80%" }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item></Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              <Typography variant="caption">
                Posted by:{" "}
                <Typography variant="caption">
                  <strong>{comment.author}</strong>
                </Typography>
              </Typography>{" "}
            </h4>
            <p style={{ textAlign: "left" }}>
              <Typography variant="body2">{comment.body}</Typography>
            </p>
          </Grid>
          {loggedInUser.username === comment.author ? <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton> : null }
        </Grid>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike}>
            {liked ? (
              <ArrowCircleUpTwoToneIcon aria-label="liked" />
            ) : (
              <ArrowCircleUpOutlinedIcon aria-label="like" />
            )}
          </IconButton>
          <Typography>{comment.votes + voted}</Typography>
          <IconButton onClick={handleDislike}>
            {disliked ? (
              <ArrowCircleDownTwoToneIcon aria-label="disliked" />
            ) : (
              <ArrowCircleDownOutlinedIcon aria-label="dislike" />
            )}
          </IconButton>
          <Typography variant="body2" color="text.secondary" align="right">
            Posted {commentDate}
          </Typography>
        </CardActions>
      </Paper>)))
  );
};
