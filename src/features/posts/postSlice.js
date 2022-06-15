import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response1) => {
      //   console.log(response1.data);
      return response1.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

export const getPostsById = createAsyncThunk(
  "posts/getPostById",
  async ({ id }) => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response2) => {
        // console.log(response2.data);
        return response2.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

export const newPost = createAsyncThunk(
  "posts/newPost",
  async (datahere, { dispatch, getState }) => {
    let newPostdatahere = datahere;
    return axios
      .post(`https://jsonplaceholder.typicode.com/posts/`, newPostdatahere)
      .then((response) => {
        console.log(response);
        // console.log(response.data);
        dispatch(addPost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: null,
  },
  reducers: {
    deleteById: (state, action) => {
      // state.list.filter();
      state.list = state.list.filter((item) => item.id !== action.payload);
      console.log("triggered & Deleted by Id", action.payload);
    },
    addPost: (state, action) => {
      // console.log(action.payload);
      let listlength = state.list.length;
      state.list.push({ ...action.payload, id: listlength + 1 });
    },
  },

  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostsById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostsById.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    },
    [getPostsById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { deleteById, addPost } = postSlice.actions;
export default postSlice.reducer;

// ======
// ======
// ======
// ======
// ======
// ======

// export const getPosts = createAsyncThunk(
//   "posts/getPosts",
//   async ({ limit }, { dispatch, getState }) => {
//     return await axios
//       .get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
//       .then((response1) => {
//         console.log(response1.data);
//         return response1.data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// );
