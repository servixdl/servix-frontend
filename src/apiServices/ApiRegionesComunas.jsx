import axios from "axios";

const BASE_URL = "http://localhost:3000/localities";

const ApiRegionesComunas = {
  getRegiones: async () => {
    const res = await axios.get(`${BASE_URL}/region`);
    return res.data;
  },

  getComunasByRegionId: async (regionId) => {
    const res = await axios.get(`${BASE_URL}/comunes/${regionId}`);
    return res.data;
  }
};

export default ApiRegionesComunas;
