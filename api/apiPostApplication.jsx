// src/api/apiTest.ts
import axiosClient from "./instance";

export const apiPostApplication = async ({ employee_id, formData: payload }) => {
  try {
    const response = await axiosClient.post(`/api/application/request?employeeId=${employee_id}`, payload);
    return response;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};
