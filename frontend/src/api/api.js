import axios from 'axios';

// 🔥 IMPORTANT: Use your deployed backend
const API_BASE_URL = 'https://lms-yyu4.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔐 Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  adminSignup: (userData) => api.post('/auth/admin-signup', userData),
};

// 📚 Course APIs
export const courseAPI = {
  getAll: () => api.get('/courses'),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  getOne: (id) => api.get(`/courses/${id}`),
};

// 🎓 Enrollment APIs
export const enrollmentAPI = {
  enroll: (courseId) => api.post(`/enrollments/${courseId}`),
  getMyEnrollments: () => api.get('/enrollments/my-courses'),
  getEnrollees: (courseId) =>
    api.get(`/enrollments/admin/course/${courseId}`),
};

// 👤 User APIs (FIXED)
export const userAPI = {
  getAll: () => api.get('/user'), // ✅ correct route
};

export default api;