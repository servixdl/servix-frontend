import mockServices from "../feature/services/mock/services.json";
const BASE_URL = "http://localhost:3000/services";
import axios from "axios";

const ApiService = {
  getAll :async  () =>{
  const response = await fetch(BASE_URL);
  const data = await response.data.json();
  return data;
},
  getByName: async (keyword) =>{
      const response = await axios.get(BASE_URL+'/name/'+keyword)
      const data = await response.data.json();
      return data
  },
  getById: async (id) => {
      const response = await fetch(BASE_URL+'/'+id);
      const data = await response.data.json();
      return data;
}
}
export default ApiService
