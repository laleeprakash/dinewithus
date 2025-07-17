import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      navigate("/signin");
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
    // While checking auth status
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
