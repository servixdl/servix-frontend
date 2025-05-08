
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ApiUser from "../apiServices/ApiUser.jsx";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (correo, contrasena) => {
    try {
      const res = await ApiUser.login({ correo, contrasena });
      console.log(res.token)
      const token = res.token;
      if (token) {
        sessionStorage.setItem("token",token);
        setUser({ token });
        toast.success("Inicio de sesión exitoso ✅");
        navigate("/perfil");
      } else {
        throw new Error("No se recibió token del servidor.");
      }
      } catch (error) {
      const msg = error?.response?.data?.message || "Credenciales inválidas";
      toast.error(msg);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    toast.info("Sesión cerrada correctamente");
    navigate("/login");
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

export const useAuth = () => useContext(AuthContext);
