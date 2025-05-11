import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const ApiUser = {
  register: async (user) => {
    const response = await axios.post(`${BASE_URL}/register`, user);
    return response.data;
  },

  login: async ({ correo, contrasena }) => {
    console.log({ correo, contrasena });
    const response = await axios.post(`${BASE_URL}/login`, {
      correo,
      contrasena
    });
    console.log(response);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  },

  update: async (id, formData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, formData, getAuthHeader());
    return response.data;
  }
};

export default ApiUser;
