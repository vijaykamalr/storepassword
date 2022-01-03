import axios from "axios";
const baseUrl = "http://localhost:8080";
export const getRequest = (url) => {
  return axios.get(baseUrl + url);
};

export const postRequest = (url, data) => {
  return axios.post(baseUrl + url, { ...data });
};
