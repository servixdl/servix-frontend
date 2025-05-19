   const dateFormat = (fechaISO) =>{
    const fecha = new Date(fechaISO);
      const newFormat = new Intl.DateTimeFormat('es-CL').format(fecha);
      return newFormat
     }

    export default dateFormat;