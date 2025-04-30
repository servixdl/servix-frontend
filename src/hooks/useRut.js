import { useState } from 'react';

/**
 * Hook personalizado para validar y formatear RUT chileno.
 */
export function useRut() {
  const [rutError, setRutError] = useState('');

  // Formatea el RUT con puntos y guion
  const formatRut = (rut) => {
    rut = rut.replace(/[^\dkK]/g, '').toUpperCase(); // Solo números y K
    if (rut.length <= 1) return rut;

    const body = rut.slice(0, -1);
    const dv = rut.slice(-1);

    const formattedBody = body
      .split('')
      .reverse()
      .reduce((acc, digit, i) => digit + (i > 0 && i % 3 === 0 ? '.' : '') + acc, '');

    return `${formattedBody}-${dv}`;
  };

  // Valida el formato del RUT (sin puntos ni guion)
  const isValidRut = (rut) => {
    const cleanRut = rut.replace(/[^\dkK]/g, '').toUpperCase();
    const regex = /^[0-9]{7,8}[0-9K]$/;
    const valid = regex.test(cleanRut);
    setRutError(valid ? '' : 'RUT inválido. Debe tener entre 7 y 8 dígitos más dígito verificador.');
    return valid;
  };

  return { formatRut, isValidRut, rutError };
}
