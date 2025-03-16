// src/api/apiTest.ts
import axiosClient from "./instance";

export const apiGetCurrentHour = async () => {
  try {
    const response = await axiosClient.get(`/api/clock-hour`);
    return response.data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};
