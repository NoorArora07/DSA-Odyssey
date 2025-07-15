import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5090/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post('/auth/signup', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const completeQuestion = (levelId, questionId) => API.post('/progress/complete', { levelId, questionId });
export const getLevel = () => API.get('/progress/getLevel');
export const getLevelQuestions = (id) => API.get(`/level/${id}`);
export const getLeaderboard = () => API.get('/profile/leaderboard');
export const getStreak = () => API.get('/progress/streak');
export const getDiscussions = () => API.get('/discuss');
export const postDiscussion = (data) => API.post('/discuss/add', data);
