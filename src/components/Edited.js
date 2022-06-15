import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsById } from "../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Box, TextField } from "@mui/material";
import axios from "axios";

const Edited = () => {
  let { id } = useParams();
  let dispatch = useDispatch();

  const [status, setStatus] = useState(false);

  const data = useSelector((state) => state.posts.list);
  //   console.log(data);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    body: "",
  });
  //   console.log(updatedData, "from api");

  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    setValues({
      title: data?.title ? data?.title : "",
      body: data?.body ? data?.body : "",
    });
  }, [data]);

  const handleChange = (e) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submitted");
    axios({
      method: "put",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      data: {
        title: values.title,
        body: values.body,
      },
    })
      .then(function (response) {
        console.log(response, "put successfully");
        setValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setStatus(true);
    // setValues({});
    setUpdatedData((prevState) => {
      return {
        ...prevState,
        title: values.title,
        body: values.body,
      };
    });
  };

  useEffect(() => {
    dispatch(getPostsById({ id }));
  }, []);

  return (
    <div>
      {" "}
      <Box component="form" sx={{ padding: 3 }}>
        <Typography>Edit here</Typography>
        <Box>
          <TextField variant="standard" disabled value={data.id} />
        </Box>
        <Box>
          <TextField
            variant="standard"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <TextField
            variant="standard"
            name="body"
            value={values.body}
            onChange={handleChange}
          />
        </Box>
        <Button onClick={handleSubmit} sx={{ margin: 2 }} variant="outlined">
          submit
        </Button>
      </Box>
      {status && (
        <>
          <Box
            sx={{
              margin: 2,
            }}
          >
            <Typography>{updatedData.title}</Typography>
            <Typography>{updatedData.body}</Typography>
            <Typography variant="h6">Updated Successfully</Typography>
            <Button onClick={() => setStatus(false)} variant="outlined">
              Close
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default Edited;
