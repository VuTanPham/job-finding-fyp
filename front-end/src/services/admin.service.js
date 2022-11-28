import axios from "axios";
import { config } from "./config";

export const getAllUsers = (token, page) =>
  axios.get(`${process.env.REACT_APP_API}/users?page=${page}`, config(token));

export const updateUserStatus = (userId, status, token) =>
  axios.put(
    `${process.env.REACT_APP_API}/users/${userId}/status`,
    { status },
    config(token)
  );
