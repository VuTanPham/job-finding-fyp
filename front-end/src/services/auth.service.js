import axios from "axios";

export const register = (body) =>
  axios.post(`${process.env.REACT_APP_API}/auth/register`, body, {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: (status) => status <= 500,
  });

export const login = (body) =>
  axios.post(`${process.env.REACT_APP_API}/auth/login`, body, {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: (status) => status <= 500,
  });
