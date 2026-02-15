import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AuditDashboard = () => {
  const { auth } = useAuth();
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axios.get(`/api/users/audit?page=${page}&limit=10`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });

        setLogs(res.data.audit);
        setTotalPages(res.data.totalPage);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
        setError("Failed to fetch audit logs");
      }
    };
    fetchRecords();
  }, [auth, page]);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Logs Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white shadow rounded-lg p-4">
        <h3>User Activities</h3>
        <ul>
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <li key={log._id} className="py-3">
                <div>
                  <span>{log.action}</span>
                  <span>{new Date(log.createdAt).toLocaleString()}</span>
                </div>
                <p>{log.details}</p>
                <p>User ID: {log.actBy}</p>
              </li>
            ))
          ) : (
            <p>No logs found.</p>
          )}
        </ul>
      </div>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${page === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <span>Pages</span>
      </div>
    </div>
  );
};

export default AuditDashboard;
