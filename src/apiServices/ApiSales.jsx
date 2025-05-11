const BASE_URL = "http://localhost:3000/sales";
import axios from "axios";
const token =sessionStorage.getItem('token')
const header = {headers:{Authorization: `Bearer ${token}`}}

const ApiSales ={
    create:async(sale)=>{
        const response = await axios.post(BASE_URL,sale,header)
        return response.data;
    },
    getById:async(id)=>{
        const response = await axios.get(BASE_URL+'/'+id,header)     
        return response.data
    },
    getAll :async  () =>{
        const response = await axios.get(BASE_URL,header);
        return response.data;
      },
    
}
export default ApiSales