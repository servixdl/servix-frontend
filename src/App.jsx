import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./feature/home/contains/Home.jsx";
import ServicePage from "./feature/services/contains/Service.jsx";
import AllServicePage from "./feature/services/contains/AllServices.jsx";
import LoginPage from "./feature/user/contains/Login.jsx";
import RegisterPage from "./feature/user/contains/Register.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/allservice" element={<AllServicePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
