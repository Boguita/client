import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

const slice = (nameKey) =>
  createSlice({
    name: nameKey,
    initialState: {
      list: [],
      loading: false,
    },
    reducers: {
      postsRequested: (posts, action) => {
        posts.loading = true;
      },

      postsReceived: (posts, action) => {
        posts.list = action.payload;
        posts.loading = false;
      },

      postsRequestFailed: (posts, action) => {
        posts.loading = false;
        swal({
          title: "Error!",
          text: action.payload,
          icon: "error",
        });
      },
    },
  });
export default slice;
