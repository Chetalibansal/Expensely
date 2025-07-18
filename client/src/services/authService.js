import axios from 'axios';

const API_BASE = "http://localhost:5000/api/v1/users";


// services/authService.js
export const loginUser = async (data) => {
  const res = await axios.post("http://localhost:5000/api/v1/users/login", data, {
    withCredentials: true, // allow cookies if needed
  });
  return res.data;
};


export const signupUser = async (data) => {
  const res = await axios.post(`${API_BASE}/register`, data);
  return res.data;
};


export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
};
