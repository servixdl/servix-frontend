import mockServices from "../mock/services.json";

const ApiService = {
  getAll: async () => {
    return mockServices;
  },

  getByName: async (keyword) => {
    return mockServices.filter((s) =>
      s.nombre.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  getById: async (id) => {
    return mockServices.find((s) => s.id_servicio === Number(id));
  },
};

export default ApiService;
