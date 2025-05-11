import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import TokenProvider from "./context/tokenContext.jsx";
import Navigation from "./routes/Navigation.jsx";
function App() {
  return (
    <div>
      <>
      <TokenProvider>
      <AuthProvider>
        <Navbar />
       <Navigation/>
        <Footer />
        </AuthProvider>
        </TokenProvider>
      </>
    </div>
  );
}

export default App;
