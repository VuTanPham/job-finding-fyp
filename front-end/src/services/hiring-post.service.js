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

export const getPost = async () => axios.get(
  `${process.env.REACT_APP_API}/hiring-posts`,
  config
);

export const createPost = async (body) => axios.post(
  `${process.env.REACT_APP_API}/hiring-posts`,
  body,
  config
);
