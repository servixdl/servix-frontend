
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { ENDPOINT } from "../config/constans.js";
import { toast } from "react-toastify";

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

  const login = async (email, password) => {
    try {
      const res = await axios.post(ENDPOINT.login, { email, password });
      const { token } = res.data;
      sessionStorage.setItem("token", token);
      setUser({ token });
      toast.success("Inicio de sesión exitoso ✅");
      navigate("/perfil");
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
