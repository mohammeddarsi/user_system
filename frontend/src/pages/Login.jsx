import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });
      setAuth({
        accessToken: res.data.accessToken,
        role: res.data.role,
      });
      navigate("/");
    } catch (error) {
      setError("Login Fiaeld ");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md, mx-auto mt-10 p-6 bg-white reounded-lg shadow-xi">
      <h2 className="text-2xi font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handelLogin}>
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
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
