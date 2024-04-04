// services/userService.js
import axiosInstance from './connect';

export const getUserById = (userData) => {
  return axiosInstance.post(`/login/`,userData);
};

export const updateUser = (userId, userData) => {
  return axiosInstance.put(`/users/${userId}`, userData);
};
