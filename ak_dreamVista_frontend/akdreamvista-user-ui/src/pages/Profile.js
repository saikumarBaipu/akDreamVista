import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://23.20.0.192:8080/api/user/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>My Profile</h2>
      {user && (
        <div>
          <p><b>Name:</b> {user.fullName}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
      )}
    </div>
  );
}
