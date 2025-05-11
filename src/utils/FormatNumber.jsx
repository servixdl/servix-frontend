/**
 * Formatea un número como peso chileno.
 * @param {number} amount - El monto a formatear.
 * @returns {string} - El monto formateado en pesos chilenos.
 */
const formatToChileanPeso = (amount) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default formatToChileanPeso;
