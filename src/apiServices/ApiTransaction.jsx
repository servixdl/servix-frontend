import axios from "axios";

const BASE_URL = "http://localhost:3000/transactions";
const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const ApiTransaction = {
getByRut: async (rut) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${rut}`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error(`Error al obtener servicios por RUT (${rut}):`, error);
      throw error;
    }
  },
    };

export default ApiTransaction;