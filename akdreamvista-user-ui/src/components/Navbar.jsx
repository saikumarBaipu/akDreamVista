import React from "react";


const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">AK DREAMVISTA - Admin</div>
      <nav>
        <a href="#">Dashboard</a>
        <a href="#">Properties</a>
        <a href="#">Users</a>
        <a href="#">Messages</a>
      </nav>
    </header>
  );
};

export default Navbar;
