const BASE_URL = "http://localhost:3000/users";
import axios from "axios";
const token =sessionStorage.getItem('token')
const header = {headers:{Authorization: `Bearer ${token}`}}
const ApiUser ={
    register:async(user)=>{
        const response = await axios.post(BASE_URL+'/register',user)
        return response.data;
    },
    login:async(user)=>{
        console.log(user)
        const response = await axios.post(BASE_URL+'/login',user)
        console.log(response)
        return response.data
    },
    getById:async(id)=>{
        const response = await axios.get(BASE_URL+'/'+id,{headers:{Authorization: header}})     
        return response.data
    },
    update:async(user,id)=>{
        const response = await axios.update(BASE_URL+'/'+id,user,{headers:{Authorization: header}})
        return response.data
    }
    
}
export default ApiUser