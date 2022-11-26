import axios from "axios";
import { config } from "./config";

export const getAllConservations = async (token) => axios.get(
    `${process.env.REACT_APP_API}/conservations`,
    config(token)
  );

export const getConservation = async (id, token) => axios.get(
    `${process.env.REACT_APP_API}/conservations/${id}`,
    config(token)
  );


  export const deleteConservation = async (id, token) => axios.delete(
    `${process.env.REACT_APP_API}/conservations/${id}`,
    config(token)
  );
