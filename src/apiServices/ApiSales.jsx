const BASE_URL = "http://localhost:3000/sales";
import axios from "axios";
import { getAuthHeader } from "./GetAuthHeader";

const ApiSales = {
  create: async (sale) => {
    const response = await axios.post(BASE_URL, sale, getAuthHeader());
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

export default ApiSales;
