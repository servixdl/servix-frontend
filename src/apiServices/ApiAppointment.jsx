const BASE_URL = "http://localhost:3000/appointments";
import axios from "axios";
import { getAuthHeader } from "./GetAuthHeader";

const ApiAppointment = {
  create: async (appointment) => {
    const response = await axios.post(BASE_URL, appointment, getAuthHeader());
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  },
  getAll: async () => {
    const response = await axios.get(BASE_URL, getAuthHeader());
    return response.data;
  },
   updateCancel: async (id) => {
      try{
        const response = await axios.put(`${BASE_URL}/cancel/${id}`,undefined,getAuthHeader());
        console.log(response.data)
    return response.data;
      }catch(error){
              console.error('Error al cancelar el servicio',error);
      throw error;
      }
    
  }, 
};
export default ApiAppointment;
