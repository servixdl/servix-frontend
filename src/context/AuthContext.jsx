import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ApiUser from "../apiServices/ApiUser.jsx";
import {jwtDecode} from "jwt-decode"; // Librería para decodificar JWT
import { TokenContext } from "./tokenContext.jsx";
import { ServiceProviderContext } from "./serviceProviderContext.jsx";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {setToken} = useContext(TokenContext);
  const {setserviceP} = useContext(ServiceProviderContext)

  // Al cargar la app, intenta restaurar sesión desde sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const rut = sessionStorage.getItem("rut");
    const nombre = sessionStorage.getItem("nombre");
    const fecha_nacimiento = sessionStorage.getItem("fecha_nacimiento");

    if (token && rut && nombre && fecha_nacimiento) {
      setUser({ token, rut, nombre, fecha_nacimiento });
    }
  }, []);

  // Función de login: autentica con el backend, decodifica token y guarda datos
  const login = async (correo, contrasena) => {
    try {
      const res = await ApiUser.login({ correo, contrasena });
      const token = res.token;
      setToken(true)

      if (!token) throw new Error("No se recibió token del servidor.");

      // Decodificar el JWT para extraer datos del usuario
      const decoded = jwtDecode(token);
      const rut = decoded.rut;
      const nombre = decoded.nombre;
      const fecha_nacimiento = decoded.fecha_nacimiento;
      const servicio = decoded.servicio;

      // Guardar datos en sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rut", rut);
      sessionStorage.setItem("nombre", nombre);
      sessionStorage.setItem("fecha_nacimiento", fecha_nacimiento);
      setserviceP(servicio)
      // Guardar usuario en el contexto
      setUser({ token, rut, nombre, fecha_nacimiento });

      toast.success("Inicio de sesión exitoso ✅");
      navigate("/perfil");

    } catch (error) {
      const msg = error?.response?.data?.message || "Credenciales inválidas";
      toast.error(msg);
    }
  };

  // Cierra sesión: limpia almacenamiento y contexto
  const logout = () => {
    sessionStorage.clear();
    setToken(false)
    setserviceP(false)
    setUser(null);
    toast.info("Sesión cerrada correctamente");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);
