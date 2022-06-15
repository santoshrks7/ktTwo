import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostsById } from "../features/posts/postSlice";
import { Card, CardContent, CardActions, Typography } from "@mui/material";

const ViewMore = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsById({ id }));
  }, []);

  const data = useSelector((state) => state.posts.list);
  // console.log(data);

  return (
    <div>
      <Card sx={{ maxWidth: 300, padding: 2 }}>
        <CardContent>
          <Typography variant="h3">{data.id}</Typography>
          <Typography variant="h5">{data.title}</Typography>
          <Typography>{data.body}</Typography>
          <CardActions></CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewMore;
