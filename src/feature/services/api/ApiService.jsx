const BASE_URL = "http://localhost:3000/services";

const ApiService = {
    getAll :async  () =>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
},
    getByName: async (keyword) =>{
        const response = await fetch(BASE_URL+'/name/'+keyword)
        const data = await response.json();
        return data
    },
    getById: async (id) => {
        const response = await fetch(BASE_URL+'/'+id);
        const data = await response.json();
        return data;
}
}
export default ApiService