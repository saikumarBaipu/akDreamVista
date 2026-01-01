import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <Header />

      {/* ================= MAIN CONTENT ================= */}
      <main className="app-content">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
