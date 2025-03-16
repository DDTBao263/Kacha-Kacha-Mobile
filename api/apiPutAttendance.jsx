  // src/api/apiTest.ts
  import axiosClient from "./instance";

  export const apiPutAttendance = async ({ attendanceId ,formData: payload }) => {
    try {
      const response = await axiosClient.put(`/api/attendance/today/${attendanceId}`, payload);
      return response.data;
    } catch (error) {
      console.error("API error at apiPutAttendance: ", error.message);
      throw error;
    }
  };
