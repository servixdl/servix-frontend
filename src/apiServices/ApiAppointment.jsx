const BASE_URL = "http://localhost:3000/appointments";
import axios from "axios";
const token =sessionStorage.getItem('token')
const header = {headers:{Authorization: `Bearer ${token}`}}

const ApiAppointment ={
    create:async(appointment)=>{
        const response = await axios.post(BASE_URL,appointment,header)
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
export default ApiAppointment