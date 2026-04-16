import axios from 'axios';

const api = axios.create({
  baseURL: "https://lms-yyu4.onrender.com/api"
});

export default api; 