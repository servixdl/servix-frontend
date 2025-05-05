const BASE_URL = "http://localhost:3000/services";

const ApiService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/servicios`);
    if (!res.ok) throw new Error("Error al obtener servicios");
    return await res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/servicios/${id}`);
    if (!res.ok) throw new Error("Error al obtener el servicio");
    return await res.json();
  },

  getByName: async (nombre) => {
    const res = await fetch(
      `${BASE_URL}/servicios?nombre=${encodeURIComponent(nombre)}`
    );
    if (!res.ok) throw new Error("Error en la búsqueda");
    return await res.json();
  },
};

export default ApiService;
