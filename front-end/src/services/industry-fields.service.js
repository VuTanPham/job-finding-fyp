import axios from "axios";

export const getAllIndustryFields = () =>
  axios.get(`${process.env.REACT_APP_API}/industry-fields`, {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: (status) => status <= 500,
  });
