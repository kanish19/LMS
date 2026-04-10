import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  adminSignup: (userData) => api.post('/auth/admin-signup', userData),
};

export const courseAPI = {
  getAll: () => api.get('/courses'),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  getOne: (id) => api.get(`/courses/${id}`),
};

export const enrollmentAPI = {
  enroll: (courseId) => api.post(`/enrollments/${courseId}`),
  getMyEnrollments: () => api.get('/enrollments/my-courses'),
  getEnrollees: (courseId) => api.get(`/enrollments/admin/course/${courseId}`),
};

export const userAPI = {
  getAll: () => api.get('/users'),
};

export default api;
