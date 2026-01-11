import axios from 'axios';

const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true, // ✅ REQUIRED for HttpOnly cookies
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default appAxios;
