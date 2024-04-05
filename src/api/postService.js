// services/userService.js
import axiosInstance from './connect';

export const getAllPosts = () => {
  return axiosInstance.get(`/posts`);
};

export const createPost = (data) => {
  return axiosInstance.post(`/createPost`, data);
};
