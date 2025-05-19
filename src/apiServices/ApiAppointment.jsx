// const BASE_URL = "http://localhost:3000/appointments";
const BASE_URL = "https://servix-backend.onrender.com/appointments";
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
};
export default ApiAppointment;
