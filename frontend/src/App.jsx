import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import PuplicRoute from "./components/PuplicRoute";
import Register from "./pages/Register";
import AdminDashbord from "./pages/AdminDashboard";
import UserDashboard from "./pages/Userdashboard";
import PrivateRoute from "./components/PrivateRoute";
import AuditLogs from "./pages/AuditDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              <PuplicRoute>
                <Login />
              </PuplicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PuplicRoute>
                <Register />
              </PuplicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {(auth) => {
                  const userRole = auth.role || auth.user?.role;
                  console.log("Accesed User Role", userRole);
                  return userRole?.toLowerCase() === "admin" ? (
                    <AdminDashbord />
                  ) : (
                    <UserDashboard />
                  );
                }}
              </PrivateRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AuditLogs />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
