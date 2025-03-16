// src/api/apiTest.ts
import axiosClient from "./instance";

export const apiPostAttendance = async ({ formData: payload }) => {
  try {
    const response = await axiosClient.post(`/api/attendance`, payload);
    return response.data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};
