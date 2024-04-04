// services/userService.js
import axiosInstance from './connect';

export const getAllPosts = () => {
  return axiosInstance.get(`/posts`);
};
