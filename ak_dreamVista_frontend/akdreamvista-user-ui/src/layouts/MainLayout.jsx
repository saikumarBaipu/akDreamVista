import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import YouTubeBar from "../components/YouTubeBar"; 

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Anni pages ikkada render avthayi */}
      </main>
      <YouTubeBar /> {/* Footer ki paina common ga untundhi */}
      <Footer />
    </>
  );
};

export default MainLayout;