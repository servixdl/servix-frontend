import { useEffect, useState } from "react";
import ApiService from "../../../apiServices/ApiService";

const UseMyService = () =>{

    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const rut = sessionStorage.getItem("rut")
    
  const fetchAll = async () => {
    
    setLoading(true);
    const data = await ApiService.getByRut(rut);
    setMyServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);


  return{myServices,loading}
}

export default UseMyService;