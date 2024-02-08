import axios from "axios";

export const apiUrl = process.env.REACT_APP_API_URL;

export const apiConfig = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // withAuth: true, // Adding Authorization header by default
  },
};
export const api = axios.create(apiConfig);
