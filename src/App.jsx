import { Route, Routes } from "react-router-dom";
import Home from "./feature/home/contains/Home.jsx";
import ServicePage from "./feature/services/contains/Service.jsx";
import AllServicePage from "./feature/services/contains/AllServices.jsx";
import RegisterPage from "./feature/user/contains/Register.jsx";
import LoginPage from "./feature/user/contains/Login.jsx";
import PerfilUsuario from "./feature/user/contains/ProfileUser.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import NotFound from "./feature/notFound/NotFound.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import TokenProvider from "./context/tokenContext.jsx";

function App() {
  return (
    <div>
      <>
      <TokenProvider>
      <AuthProvider>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/allservice" element={<AllServicePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <PerfilUsuario />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        </AuthProvider>
        </TokenProvider>
      </>
    </div>
  );
}

export default App;
