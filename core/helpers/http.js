import axios from "axios";
import { API_URL, API_URL2 } from "../config/environment";

export const http_secured = axios.create({
  baseURL: API_URL,
  timeout: 200000,
});
export const http_unsecured = axios.create({
  baseURL: API_URL2,
  timeout: 200000,
});
