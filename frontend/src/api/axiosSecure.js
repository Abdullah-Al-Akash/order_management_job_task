import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://order-management-job-task-git-main-abdullahalakashs-projects.vercel.app/api', // ✅ Update if you're deployed
  withCredentials: false, // ✅ No cookies needed
});

export default axiosSecure;
