import mockServices from "../feature/services/mock/services.json";
const BASE_URL = "http://localhost:3000/services";
import axios from "axios";

const ApiService = {
  getAll :async  () =>{
  const response = await axios.get(BASE_URL);
  return response.data;
},
  getByName: async (keyword) =>{
      const response = await axios.get(BASE_URL+'/name/'+keyword);
      return response.data;
  },
  getById: async (id) => {
      const response = await axios.get(BASE_URL+'/'+id);
      return response.data;
}
}
export default ApiService
