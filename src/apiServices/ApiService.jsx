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
  },
    create:async(service)=>{
      try{
        const response = await axios.post(BASE_URL,service,getAuthHeader());
        return response.data;
      }catch(error){
      console.error('Error al crear el servicio', error);
      throw error;
      }
        
    },
    update: async (id, service) => {
    const response = await axios.put(`${BASE_URL}/${id}`, service, getAuthHeader());
    return response.data;
  }, 
  delete: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  }, 

};

export default ApiService;

