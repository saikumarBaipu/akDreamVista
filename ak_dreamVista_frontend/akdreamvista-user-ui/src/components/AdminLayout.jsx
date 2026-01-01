import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
