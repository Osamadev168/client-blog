import axios from "axios";
import { useContext } from "react";
const baseurl = "http://localhost:5000";

export const createAccount = async (data) => {
  await axios.post(`${baseurl}/signup`, data);
};
