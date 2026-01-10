import axios from 'axios';

const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default appAxios;
