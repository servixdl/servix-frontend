import SearchService from "../components/search";
import CardService from "../components/cardService";
import useServices from "../hooks/UseService";
import { Link } from "react-router-dom";
export default function AllServicePage() {
  const {services,search,loading} =useServices();
 
  return (
    <div  className="flex flex-col md:flex-row gap-4">

      <div className="w-full md:w-1/4 justify-center items-center rounded-lg bg-white h-64 shadow-lg flex">
       <SearchService onSearch={search}/>
      </div>

      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service)=> (
          <Link to={'/service/'+service.id_servicio} key={service.id_servicio}>
        <CardService key={service.id_servicio} 
        service={{
          name: service.nombre,
          price: service.precio,
          description: service.descripcion,
          id: service.id_servicio,
        }}
        /> 
          </Link>
        ))};
         </div>
         
    </div>
  );
}
