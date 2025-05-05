import { useEffect, useState } from "react";

const useServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/services");
      if (!response.ok) throw new Error("Error al obtener servicios");
      const data = await response.json();
      setAllServices(data);
      setServices(data);
    } catch (error) {
      console.error("Error en fetchAll:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const search = (keyword) => {
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
