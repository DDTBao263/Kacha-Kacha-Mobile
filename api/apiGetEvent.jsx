// src/api/apiTest.ts
import axiosClient from "./instance";

export const apiGetEvent = async () => {
  try {
    const response = await axiosClient.get(`/api/event`);
    return response.data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};
