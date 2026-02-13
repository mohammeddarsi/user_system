import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handelLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setAuth(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Faield", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white mr-4" to="/">
          Home
        </Link>
        <div>
          {auth?.accessToken ? (
            <>
              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                onClick={handelLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-white mr-4" to="/login">
                Login
              </Link>
              <Link className="text-white mr-4" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
