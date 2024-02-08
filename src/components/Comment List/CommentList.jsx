import { useContext, useEffect, useState } from "react";
import { fetchCommentsbyArticle, postNewComment } from "../../utils/utils";
import {useParams } from "react-router-dom";
import { CommentCard } from "../CommentCard/CommentCard";
import Box from "@mui/material/Box";
import "./CommentList.css"
import { Button, CircularProgress, Collapse, List, TextField, Tooltip } from "@mui/material";
import { UserContext } from "../../context/UserContext";


export const CommentList = ({ id }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [clicked, setClicked] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  const [posted, setPosted] = useState(false)
  const [newComment, setNewComment] = useState("")
  const loggedInUser = useContext(UserContext)

  const addComment =(newComment)=>{
    setCommentsData((commentsData)=>{
      return [newComment, ...commentsData]
    })
  }

  const handleClick = ()=> {
    setClicked((prev)=> !prev)
    setPosted(false)
  }

  const handleSubmit = (comment) => {
const newCommentData = {
      article_id: id,
      author: loggedInUser.username,
      body: comment,
      comment_id: Date.now(),
      created_at: new Date().toISOString(),
      votes: 0,
    }
    addComment(newCommentData)
    setPostLoading(true)
    postNewComment(id, loggedInUser, comment).then(()=>{
      setNewComment("")
      setPostLoading(false)
      setPosted(true)     
    }).catch((err)=>{
      setCommentsData.slice(1)
    })
  }

  useEffect(() => {
    fetchCommentsbyArticle(id).then(({ comments }) => {
      setCommentsData(comments);
    });
  }, [id]);

  return (
    <List sx={{ display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3, width: "100%" }}>
    <Button fullWidth sx={{ margin: "5px", maxWidth: "80%"}} variant="outlined" onClick={handleClick} >{posted ? "Post again?":(clicked ? "NeverMind" : "Add a Comment")} </Button>
<Collapse in={clicked} sx={{ m: 1, width: "100%"}} unmountOnExit >
<Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
              width:"100%"
            }}
          >
          <form id="commentForm" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(newComment)
          }}>
      <TextField required fullWidth id="outlined-basic" label="Your comment here..." variant="outlined" rows={4}multiline sx={{
    m: 1, width: "80%" }} onChange={({target}) => {setNewComment(target.value)}}
    />
     <Button fullWidth sx={{ margin: "5px", maxWidth: "80%"}} variant="outlined" type="submit" disabled={posted}>{ posted ? <Tooltip title="Want to post again? Click Post Again"><span>Posted!</span></Tooltip> : (postLoading ? <CircularProgress /> : <span>Post</span>)}</Button>
    </form>
    </Box>
     
</Collapse>
      {commentsData.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} id={id} />
      ))}
      </List>
  
  );
};
