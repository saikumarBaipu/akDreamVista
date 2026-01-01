const BASE_URL = "http://3.237.234.18:8080";

/* 🔓 PUBLIC APIs (NO TOKEN) */
export const fetchAllProperties = () => {
  return fetch(`${BASE_URL}/api/properties/all`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    });
};

/* 🔒 PROTECTED APIs (TOKEN REQUIRED) */
export const fetchAdminDashboard = () => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/api/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error("403 Forbidden");
    return res.json();
  });
};
