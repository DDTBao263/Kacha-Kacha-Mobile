import axiosClient from "./instance";

export const apiGetAttendanceToday = async ({ employee_id }) => {
    try {
      const response = await axiosClient.get(`/api/attendance/today/employee/${employee_id}`);
      return response; 
    } catch (error) {
      if (error.response?.status === 400) {
        return null; 
      }
      console.error("API error:", error.message);
      throw error; 
    }
  };
  