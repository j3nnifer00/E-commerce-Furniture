// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { ShopContextProvider } from "./context/ShopContext.js";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.js"

import AdminRoutes from "./routes/AdminRoutes";
import CheckoutRoutes from "./routes/CheckoutRoutes";
import ShopRoutes from "./routes/ShopRoutes";
import UserRoutes from "./routes/UserRoutes";

import useTokenExpiration from './hooks/useTokenExpiration';

function App() {
  useTokenExpiration();
  
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
              
              {/* Checkout Routes */}
              <Route path="/checkout/*" element={<CheckoutRoutes />} />
              
              {/* Shop Routes */}
              <Route path="/shop/*" element={<ShopRoutes />} />
              
              {/* User Routes */}
              <Route path="/user/*" element={<UserRoutes />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
