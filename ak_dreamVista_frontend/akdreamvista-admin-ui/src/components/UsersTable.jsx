import React, { useEffect, useState } from "react";
import "./UsersTable.css";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;
  const token = localStorage.getItem("token");
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
  useEffect(() => {
    fetch("http://localhost:8080/api/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Forbidden");
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("User fetch error:", err);
        setLoading(false);
      });
  }, []);

  const toggleStatus = (id, active) => {
  fetch(`http://localhost:8080/api/user/${id}/status?active=${active}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(res => {
      if (res.ok) {
       
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === id ? { ...user, active: active } : user
          )
        );
      } else {
        alert("Failed to update status");
      }
    })
    .catch(err => console.error("FETCH ERROR:", err));
};


  const totalPages = Math.ceil(users.length / usersPerPage);
  const start = (currentPage - 1) * usersPerPage;
  const pageUsers = users.slice(start, start + usersPerPage);

  return (
    <div className="table-wrapper">
      <div className="table-header">
        
        <h3 className="ap-heading">
  <span class="heading-black">All</span>
  <span class="heading-orange">Users</span>
</h3>

      </div>

      {loading ? (
        <p className="users-empty">Loading users...</p>
      ) : (
        <>
          <div className="table-scroll-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pageUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="users-empty">
                      No users found
                    </td>
                  </tr>
                ) : (
                  pageUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{start + index + 1}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.active ? "active" : "inactive"}`}>
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                     <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <button
                          className={`status-btn ${user.active ? "deactivate" : "activate"}`}
                          onClick={() => toggleStatus(user.id, !user.active)}
                        >
                          {user.active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
