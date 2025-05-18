import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import TokenProvider from "./context/tokenContext.jsx";
import Navigation from "./routes/Navigation.jsx";
import ServiceProvider from "./context/serviceProviderContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/complex/Navbar.jsx";
import Footer from "./components/complex/Footer.jsx";
function App() {
  return (
    <div>
      <>
        <TokenProvider>
          <ServiceProvider>
            <AuthProvider>
              <Navbar />
              <ToastContainer position="top-right" autoClose={5000} />
              <Navigation />
              <Footer />
            </AuthProvider>
          </ServiceProvider>
        </TokenProvider>
      </>
    </div>
  );
}

export default App;
