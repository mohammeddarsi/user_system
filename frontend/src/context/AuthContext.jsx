import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/refreshToken", {
          withCredentials: true,
        });
        console.log("Refresh data recived", res.data);
        setAuth({
          accessToken: res.data.accessToken,
          role: res.data.user.role,
          email: res.data.user.email,
          username: res.data.user.username,
        });
      } catch (error) {
        setAuth(null);
        console.error("Refresh Faield", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
