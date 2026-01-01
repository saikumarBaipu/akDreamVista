import "./Topbar.css";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div className="topbar">
      <input type="text" placeholder="Search properties..." className="search" />

      <div className="top-right">
        <span className="admin-name">Admin</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
