import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../feature/home/contains/Home.jsx";
import ServicePage from "../feature/services/contains/Service.jsx";
import AllServicePage from "../feature/services/contains/AllServices.jsx";
import RegisterPage from "../feature/user/contains/Register.jsx";
import LoginPage from "../feature/user/contains/Login.jsx";
import PerfilUsuario from "../feature/user/contains/ProfileUser.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import NotFound from "../feature/notFound/NotFound.jsx";
import Sale from "../feature/sale/content/Sale.jsx";
import ServiceSolic from "../../src/feature/services/contains/ServiceSolic.jsx"
import MyServices from "../feature/myServices/contens/MyServices.jsx";
import { useContext } from "react";
import { TokenContext } from "../context/tokenContext.jsx";
import ContactPage from "../feature/contact/Contact.jsx";
import SalePay from "../feature/sale/content/SalePay.jsx";
function Navigation() {
  const { token } = useContext(TokenContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service/:id" element={<ServicePage />} />
      <Route path="/allservice" element={<AllServicePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/sale/:id" element={!token ? <Home /> : <Sale />} />
      <Route path="/myServices" element={!token ? <Home /> : <MyServices />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/salePay" element={<SalePay />} />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <PerfilUsuario />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/servicios-solicitados"
        element={
          <PrivateRoute>
            <ServiceSolic />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Navigation;
