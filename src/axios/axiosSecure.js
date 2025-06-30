import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://suggesto-product-reco-server.vercel.app',
  withCredentials: true,
});

export default axiosSecure;
