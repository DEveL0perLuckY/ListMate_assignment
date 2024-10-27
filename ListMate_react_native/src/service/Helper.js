import axios from "axios";

let BASE_URL = "https://todo-app-deployment-fi8v.onrender.com";

export const MYAXIOS = axios.create({
  baseURL: BASE_URL,
});
