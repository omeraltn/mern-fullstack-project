import axios from "axios";
import { toast } from "react-toastify";

export const getPostsAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5001/getPosts");

    dispatch({ type: "GET_POSTS", payload: data });
  } catch (error) {
    const msg = error.response?.data?.message || "Bir hata oluştu!";
    toast.error(msg, { position: "top-right", autoClose: 2000 });
  }
};

export const createPostsAction = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5001/createPost",
      postData,
    );

    dispatch({ type: "CREATE_POST", payload: data });
  } catch (error) {
    const msg = error.response?.data?.message || "Bir hata oluştu!";
    toast.error(msg, { position: "top-right", autoClose: 2000 });
  }
};

export const updatePostsAction = (id, postData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:5001/updatePost/${id}`,
      postData,
    );

    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    const msg = error.response?.data?.message || "Bir hata oluştu!";
    toast.error(msg, { position: "top-right", autoClose: 2000 });
  }
};

export const deletePostsAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5001/deletePost/${id}`);

    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    const msg = error.response?.data?.message || "Bir hata oluştu!";
    toast.error(msg, { position: "top-right", autoClose: 2000 });
  }
};
