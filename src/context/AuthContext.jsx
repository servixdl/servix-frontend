import { createContext, useContext, useState } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

/**
 * Componente proveedor del contexto de autenticación.
 * Contiene estado global para el usuario y el token de sesión.
 */
export const AuthProvider = ({ children }) => {
  // Estado inicial con token recuperado de sessionStorage si existe
  const [auth, setAuth] = useState({
    user: null,
    token: sessionStorage.getItem('token') || null,
  });

  // Función para iniciar sesión y guardar el token
  const login = (userData, token) => {
    sessionStorage.setItem('token', token);
    setAuth({ user: userData, token });
  };

  // Función para cerrar sesión y limpiar sesión
  const logout = () => {
    sessionStorage.removeItem('token');
    setAuth({ user: null, token: null });
  };

  // Proveemos el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);
