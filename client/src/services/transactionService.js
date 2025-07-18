// src/services/transactionService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/transactions';

export const getAllTransactions = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.transactions;
};
