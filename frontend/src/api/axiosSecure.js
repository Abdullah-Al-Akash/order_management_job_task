import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Update if you're deployed
  withCredentials: false, // ✅ No cookies needed
});

export default axiosSecure;
