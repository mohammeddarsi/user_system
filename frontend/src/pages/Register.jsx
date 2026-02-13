import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      setError("Register Fiaeld ");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md, mx-auto mt-10 p-6 bg-white reounded-lg shadow-xi">
      <h2 className="text-2xi font-bold mb-4">Register Form</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form>
        <div>
          <input
            type="username"
            placeholder="username"
            value={form.username}
            required
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            value={form.email}
            required
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={form.password}
            required
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          className="w-full p-2 bg-blue-600 text-white border rounded hover:bg-blue-600"
          onClick={handelSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
