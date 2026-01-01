import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";

// PAGES
import Home from "./pages/Home";
import BuyProperty from "./pages/BuyProperty";
import SellProperty from "./pages/SellProperty";
import ConstructHome from "./pages/ConstructHome";
import Elevators from "./pages/Elevators";
import About from "./pages/About";
import Help from "./pages/Help";
import PropertyDetails from "./pages/PropertyDetails";
// AUTH
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminForgotPassword from "./pages/ForgotPassword";
import UserForgotPassword from "./pages/UserForgotPassword";

// ADMIN
import AdminDashboard from "./components/AdminDashboard";
import AddProperty from "./pages/AddProperty";

import "./styles/global.css";

export default function App() {
  return (
    <Routes>

      {/* ================= PUBLIC + USER LAYOUT ================= */}
      <Route element={<MainLayout />}>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyProperty />} />
        <Route path="/sell" element={<SellProperty />} />
        <Route path="/construct" element={<ConstructHome />} />
        <Route path="/elevators" element={<Elevators />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
<Route path="/property-details/:id" element={<PropertyDetails />} />
        {/* ================= ADMIN ONLY ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-property"
          element={
            <PrivateRoute role="ADMIN">
              <AddProperty />
            </PrivateRoute>
          }
        />

      </Route>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-signup" element={<AdminSignup />} />

      <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
      <Route path="/user-forgot-password" element={<UserForgotPassword />} />

    </Routes>
  );
}
