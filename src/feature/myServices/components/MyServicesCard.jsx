import PropTypes from "prop-types";
import formatToChileanPeso from "../../../utils/FormatNumber";

const MyServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full md:w-1/2 lg:w-1/3">
      <img
        className="rounded-lg h-40 w-full object-cover mb-3"
        src={service.image}
        alt={service.name}
      />
      <h2 className="text-xl font-semibold">{service.name}</h2>
      <p className="text-gray-600">{service.description}</p>
      {service.price && (
        <p className="text-highlight text-lg mt-2">
          Valor: {formatToChileanPeso(service.price)}
        </p>
      )}
      <div className="flex justify-between mt-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
          onClick={() => onEdit(service)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          onClick={() => onDelete(service.id_servicio)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

MyServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default MyServiceCard;
