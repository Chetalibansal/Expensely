import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE}/login`, { email, password });
  return response.data;
};

export const signupUser = async (name, email, password) => {
  const response = await axios.post(`${API_BASE}/signup`, { name, email, password });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
};
