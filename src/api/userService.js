// services/userService.js
import axiosInstance from './connect';

export const getUserById = (userData) => {
  return axiosInstance.post(`/login`,userData);
};

export const updateUser = (userId, userData) => {
  return axiosInstance.put(`/users/${userId}`, userData);
};

export const updateProfile = (userData) => {
  console.log({userData})
  return axiosInstance.put(`/updateProfileImages`, userData);
}

export const update = (userData) => {
  console.log("update:",{userData})
  return axiosInstance.post(`/upload`, userData);
}
