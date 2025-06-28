
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/api', // change if deployed
  withCredentials: true,
});

// Optional: Interceptor to attach token
axiosSecure.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosSecure;
