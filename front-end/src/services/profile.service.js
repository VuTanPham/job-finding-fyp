import axios from "axios";
import { config } from "./config";

export const getAllUsers = (token) =>
  axios.get(
    `${process.env.REACT_APP_API}/users/`,
    config(token)
  );

export const getProfile = (userId, token) =>
  axios.get(
    `${process.env.REACT_APP_API}/users/${userId}`,
    config(token)
  );

export const updateUserProfile = async (userId, profile, token) => axios.put(
  `${process.env.REACT_APP_API}/users/${userId}`,
  {...profile},
  config(token)
);