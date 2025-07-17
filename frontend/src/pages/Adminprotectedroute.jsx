import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const tokenTimestamp = localStorage.getItem("adminTokenTimestamp");

    const logout = () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminTokenTimestamp");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminName");
      setIsAuthenticated(false);
      navigate("/adminlogin");
    };

    if (!token || !tokenTimestamp) {
      logout();
      return;
    }

    const now = Date.now();
    const elapsed = now - parseInt(tokenTimestamp, 10);

    // Token valid for 1 hour (3600000 ms)
    if (elapsed > 3600000) {
      logout();
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default AdminProtectedRoute;
