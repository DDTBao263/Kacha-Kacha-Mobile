import axiosClient from "./instance";

export const apiGetApplication = async ({ employee_id }) => {
    try {
      const response = await axiosClient.get(`/api/application/employee/{id}?employeeId=${employee_id}`);
    // console.log(response.data.data)
      return response?.data; 
    } catch (error) {
      if (error.response?.status === 400) {
        return null; 
      }
      console.error("API error:", error.message);
      throw error; 
    }
  };
  