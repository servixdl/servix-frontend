import axios from "axios";

const BASE_URL = "http://localhost:3000/ServiSolicitados"; // Coincide con tu backend

const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const ApiBitacora = {
  // Obtener la bitácora de un usuario
  getBitacoraServicios: async (rut) => {
    const response = await axios.get(`${BASE_URL}/${rut}`, getAuthHeader());
    return response.data;
  },

  // Cancelar una cita por ID
  cancelarCita: async (id) => {
    const response = await axios.put(`${BASE_URL}/cancelar/${id}`, null, getAuthHeader());
    return response.data;
  },

  // Eliminar una cita por ID
  eliminarCita: async (id) => {
    const response = await axios.delete(`${BASE_URL}/eliminar/${id}`, getAuthHeader());
    return response.data;
  }
};

export default ApiBitacora;
