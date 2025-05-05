import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../api/ApiService";

export default function ServicePage() {
  const {id} = useParams();
  const [service, setService] = useState({});


  useEffect(() => {
    const fetchService = async () => {
      const response = await ApiService.getById(id);
      setService(response);
    };

    fetchService();
  }, [id]);

  if (!service) return <p>Cargando...</p>;
  return (
    <div>
     

      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2 w-full justify-center items-center flex">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUid_Q7Swsoed22nJxVgvDvHeKGKrNy6mqmgJTQCikFPfcy-VG3MolGdZbWeV7TvPwDI8&usqp=CAU" alt="" />
        </div>
        
        
        <div className="md:w-1/2 w-full">
        <h2 className="text-xl font-semibold mb-2">{service.nombre}</h2>
          <p className="text-gray-700 mb-2">{service.descripcion}</p>
          <p className="text-blue-600 font-bold text-lg">${service.precio}</p>
        </div>
      </div>
    </div>
    
  );
}
