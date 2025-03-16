// src/api/axiosClient.js
import axios from 'axios';
import { useGlobalContext } from "../context/GlobalProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: 'https://swd-6ade2472469b.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)?.token}`;
  }
  return config;
}, error => Promise.reject(error));

export default axiosClient;
