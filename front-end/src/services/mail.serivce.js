import axios from "axios";
import { config } from "./config";

export const sendMail = async (employeeId, companyId, companyAddress, token) => axios.post(
    `${process.env.REACT_APP_API}/mail`,
    {employeeId, companyId, companyAddress},
    config(token)
  );