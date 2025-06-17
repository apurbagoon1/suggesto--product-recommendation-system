// src/axios/axiosSecure.js
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://suggesto-product-reco-server.vercel.app',
  withCredentials: true, // 👈 automatically sends cookies
});

export default axiosSecure;
