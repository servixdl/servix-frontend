import { useEffect, useState } from "react";
import ApiService from "../api/ApiService"; 

const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const data = await ApiService.getAll();
    setServices(data);
    setLoading(false);
  };


  useEffect(() => {
    fetchAll();
  }, []);


  const search = async (keyword) => {
    setLoading(true);
    if (!keyword.trim()) {
      await fetchAll();
    } else {
      const results = await ApiService.getByName(keyword);
      setServices(results);
    }
    setLoading(false);
  };
 

 

  return {
    services,
    search,
    loading,
  };
};

export default useServices;
