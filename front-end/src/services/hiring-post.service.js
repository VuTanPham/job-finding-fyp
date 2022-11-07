import axios from "axios";
import { config } from "./config";

export const uploadImage = async (body) => {
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dgginxijj/upload",
      body,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (page, searchParam, token) => axios.get(
  `${process.env.REACT_APP_API}/hiring-posts?page=${page}&searchParam=${searchParam}`,
  config(token)
);

export const getOwnPost = async (page, searchParam, token) => axios.get(
  `${process.env.REACT_APP_API}/hiring-posts/manage?page=${page}&searchParam=${searchParam}`,
  config(token)
);

export const createPost = async (body, token) => axios.post(
  `${process.env.REACT_APP_API}/hiring-posts`,
  body,
  config(token)
);

export const applyToPosts = async (postId, token) => axios.post(`${process.env.REACT_APP_API}/hiring-posts/apply`, {postId} , config(token))
