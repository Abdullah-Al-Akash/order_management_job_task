import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://order-management-job-task-git-main-abdullahalakashs-projects.vercel.app/api',
});

export default axiosPublic;
