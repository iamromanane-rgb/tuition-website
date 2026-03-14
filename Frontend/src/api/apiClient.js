import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Classes API
export const getClasses = () => apiClient.get('/classes/all');
export const createClass = (classData, adminToken) =>
  apiClient.post('/classes/create', classData, {
    headers: { 'x-admin-token': adminToken }
  });
export const updateClass = (id, classData, adminToken) =>
  apiClient.put(`/classes/update/${id}`, classData, {
    headers: { 'x-admin-token': adminToken }
  });
export const deleteClass = (id, adminToken) =>
  apiClient.delete(`/classes/delete/${id}`, {
    headers: { 'x-admin-token': adminToken }
  });

// Contact API
export const submitContact = (contactData) =>
  apiClient.post('/contact/submit', contactData);
export const getSubmissions = (adminToken) =>
  apiClient.get('/contact/submissions', {
    headers: { 'x-admin-token': adminToken }
  });
export const markSubmissionAsRead = (id, adminToken) =>
  apiClient.put(`/contact/submissions/${id}/read`, {}, {
    headers: { 'x-admin-token': adminToken }
  });
export const deleteSubmission = (id, adminToken) =>
  apiClient.delete(`/contact/submissions/${id}`, {
    headers: { 'x-admin-token': adminToken }
  });

// Admin API
export const getAdminInfo = () => apiClient.get('/admin/info');
export const updateAdminInfo = (adminData, adminToken) =>
  apiClient.put('/admin/info/update', adminData, {
    headers: { 'x-admin-token': adminToken }
  });

export default apiClient;
