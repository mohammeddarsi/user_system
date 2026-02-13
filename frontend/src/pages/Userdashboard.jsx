import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const UserDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axios.get("/api/users/me/", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });
        setProfile(res.data.user);
      } catch (error) {
        console.error("Failed to show profile", error);
        setError("Failed to show profile");
      }
    };

    fetchProfile();
  }, [auth]);

  return (
    <div className="continer mx-auto mt-10">
      <h2>User Dashboard</h2>
      {error && <p> {error}</p>}
      {profile && (
        <div>
          <h3>profile Informaion</h3>
          <p>
            <strong>Username:</strong>
            {profile.username}
          </p>
          <p>
            <strong>Email:</strong>
            {profile.email}
          </p>
          <p>
            <strong>Role:</strong>
            {profile.role}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
