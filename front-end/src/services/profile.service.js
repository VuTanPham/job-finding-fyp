import axios from "axios";
import { config } from "./config";

export const getAllUsers = (token) =>
  axios.get(`${process.env.REACT_APP_API}/users/`, config(token));

export const getProfile = (userId, token) =>
  axios.get(`${process.env.REACT_APP_API}/users/${userId}`, config(token));

export const updateUserProfile = async (userId, profile, token) =>
  axios.put(
    `${process.env.REACT_APP_API}/users/${userId}`,
    { ...profile },
    config(token)
  );

export const addNewExperience = (userId, exp, token) =>
  axios.post(
    `${process.env.REACT_APP_API}/users/${userId}/experiences`,
    exp,
    config(token)
  );

export const addNewProject = (userId, pj, token) =>
  axios.post(
    `${process.env.REACT_APP_API}/users/${userId}/projects`,
    pj,
    config(token)
  );

