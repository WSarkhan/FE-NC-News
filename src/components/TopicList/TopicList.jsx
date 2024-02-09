import { useEffect, useState } from "react";
import "./TopicList.css";
import { getTopics } from "../../utils/utils";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";

export const TopicList = ({ topic, setTopic }) => {
  const [topicsList, setTopicsList] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopicsList(data);
      })
      .catch((err) => {
        setErr(err.message);
      });
  });
  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  if (err) {
    return (
      <Box sx={{ minWidth: 120 }}>
        <Alert severity="error">{err}</Alert>
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Topic</InputLabel>
          <Select
            labelId="topic-select"
            id="topic-select"
            value={topic}
            label="topic"
            onChange={handleChange}
          >
            <MenuItem key="All" value="All">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                All
              </Link>
            </MenuItem>
            {topicsList.map(({ slug }) => (
              <MenuItem key={slug} value={slug}>
                <Link
                  to={`/${slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {slug}
                </Link>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
