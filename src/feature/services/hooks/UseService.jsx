import { useEffect, useState } from "react";
import ApiService from "../../../apiServices/ApiService";

const useServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const data = await ApiService.getAll();
    setAllServices(data);
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const search = async (keyword) => {
    setLoading(true);
    if (!keyword.trim()) {
      setServices(allServices);
    } else {
      const filtered = allServices.filter((service) =>
        service.nombre.toLowerCase().includes(keyword.toLowerCase())
      );
      setServices(filtered);
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
