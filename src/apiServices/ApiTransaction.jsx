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
      const responses = response.data
      responses.sort((a, b) => new Date(a.fecha_venta) - new Date(b.fecha_venta));
      return responses;
    } catch (error) {
      console.error(`Error al obtener servicios por RUT (${rut}):`, error);
      throw error;
    }
  },
    };

export default ApiTransaction;