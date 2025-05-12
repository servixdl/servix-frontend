import axios from "axios";
const BASE_URL = "http://localhost:3000/types_services";

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const ApiTypesServices = {
  getAll: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener todos los servicios:", error);
      throw error;
    }
  }
}

export default ApiTypesServices