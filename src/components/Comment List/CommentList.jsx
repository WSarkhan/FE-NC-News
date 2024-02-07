import { useEffect, useState } from "react";
import { fetchCommentsbyArticle } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { CommentCard } from "../CommentCard/CommentCard";
import Box from "@mui/material/Box";
import "./CommentList.css"

export const CommentList = ({ id }) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    fetchCommentsbyArticle(id).then(({ comments }) => {
      setCommentsData(comments);
    });
  }, [id]);

  return (
   <ul>
      {commentsData.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
  </ul>
  );
};
