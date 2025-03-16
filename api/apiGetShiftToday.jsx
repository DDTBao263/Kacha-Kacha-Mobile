// src/api/apiTest.ts
import axiosClient from "./instance";

export const apiGetShiftToday = async ({ employee_id }) => {
  try {
    const response = await axiosClient.get(`/api/shift/today/employee/${employee_id}`);
    return response;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};
