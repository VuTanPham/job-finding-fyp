import axios from "axios";

export const register = (body) =>
  axios.post(`${process.env.REACT_APP_API}/auth/register`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
