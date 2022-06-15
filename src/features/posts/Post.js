import React, { useEffect } from "react";
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

const Post = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.posts.list);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

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
      <Button
        variant="outlined"
        onClick={() => dispatch(newPost({ title: "bye", body: "hi" }))}
      >
        Add New Post
      </Button>
      <Grid container spacing={2}>
        {postsElements}
      </Grid>
    </div>
  );
};
export default Post;
