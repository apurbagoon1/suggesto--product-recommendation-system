// src/axios/axiosSecure.js
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // 👈 automatically sends cookies
});

export default axiosSecure;
