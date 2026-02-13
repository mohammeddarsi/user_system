import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!auth.accessToken) return;
      try {
        const res = await axios.get(`/api/users?page=${page}&limit=10`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Faieldd to fetcch users:", error);
        setError("Fieldd to fetch users");
      }
    };
    fetchUsers();
  }, [auth, page]);
  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="test-2xl font-bold mb-4">Admin Dashboard</h2>

      <Link
        className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 ml-4"
        to="/audit"
      >
        Logs
      </Link>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h3 className="text-xl font-semibold mb-4">User Management</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id}>
            <span>
              {user.username} ({user.email}) - {user.role}
            </span>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`px-3 py-1 rounded ${page === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            key={index}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        pages
      </div>
    </div>
  );
};
export default AdminDashboard;
