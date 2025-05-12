
import axios from "axios";

const BASE_URL = "http://localhost:3000/services";

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const ApiService = {
  getAll: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener todos los servicios:", error);
      throw error;
    }
  },

  getByName: async (keyword) => {
    try {
      const response = await axios.get(`${BASE_URL}/name/${keyword}`);
      return response.data;
    } catch (error) {
      console.error(`Error al buscar servicio por nombre (${keyword}):`, error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener servicio con ID ${id}:`, error);
      throw error;
    }
  },

  getByRut: async (rut) => {
    try {
      const response = await axios.get(`${BASE_URL}/servicesProvider/${rut}`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error(`Error al obtener servicios por RUT (${rut}):`, error);
      throw error;
    }
  }
};

export default ApiService;

