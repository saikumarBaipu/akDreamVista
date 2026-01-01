import React, { useEffect, useState } from "react";
import "./UsersTable.css";

export default function UsersTable({ onClose }) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const token = localStorage.getItem("token");

  /* ================= FETCH USERS ================= */
 useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://3.237.234.18:8080/api/user/all", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Forbidden");
      return res.json();
    })
    .then((data) => {
      setUsers(data);
      setLoading(false); // ✅ IMPORTANT
    })
    .catch((err) => {
      console.error("User fetch error:", err);
      setLoading(false); // ✅ IMPORTANT
    });
}, []);



  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(users.length / usersPerPage);
  const start = (currentPage - 1) * usersPerPage;
  const pageUsers = users.slice(start, start + usersPerPage);

  return (
    <div className="table-wrapper">

      <div className="table-header">
        <h3>All Users</h3>
      

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
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {pageUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="users-empty">
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
                      <td>{user.createdDate?.slice(0, 10)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Prev
              </button>

              <span>Page {currentPage} of {totalPages}</span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
