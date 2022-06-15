import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteById, getPosts, newPost } from "./postSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";

const Post = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.posts.list);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const [newPost1, setNewPost] = useState({
    title: "",
    body: "",
  });
  console.log(newPost1);

  const handleChange = (e) => {
    setNewPost((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newPost({
        title: newPost1.title,
        body: newPost1.body,
      })
    );
  };

  // console.log(data);

  const navigate = useNavigate();
  const postsElements = data.map((item) => {
    return (
      <Grid item key={item.id}>
        <Card sx={{ maxWidth: 300, padding: 2 }}>
          <CardContent>
            <Typography variant="h3">{item.id}</Typography>
            <Typography variant="h5">{item.title}</Typography>
            <Typography>{item.body}</Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => navigate(`/posts/${item.id}`)}
              variant="contained"
            >
              more
            </Button>
            <Button
              onClick={() => navigate(`/edit/${item.id}`)}
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              onClick={() => dispatch(deleteById(item.id))}
              variant="outlined"
            >
              Del
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <div>
      <Grid container spacing={2}>
        <Box component="form" sx={{ padding: 3 }}>
          <Typography>Edit here</Typography>
          <Box>
            <TextField variant="standard" disabled value={data.id} />
          </Box>
          <Box>
            <TextField
              variant="standard"
              name="title"
              value={newPost.title}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              variant="standard"
              name="body"
              value={newPost.body}
              onChange={handleChange}
            />
          </Box>
          <Button onClick={handleSubmit} sx={{ margin: 2 }} variant="outlined">
            Add new
          </Button>
        </Box>
        {postsElements}
      </Grid>
    </div>
  );
};
export default Post;
