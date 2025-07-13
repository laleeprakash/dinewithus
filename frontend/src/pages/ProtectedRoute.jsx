import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");

    if (!token || !tokenTimestamp) {
      logout();
      return;
    }

    const now = Date.now();
    const elapsed = now - parseInt(tokenTimestamp, 10);

    // 1 hour = 3600000 milliseconds
    if (elapsed > 3600000) {
      logout();
    } else {
      setIsAuthenticated(true);
    }

    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      navigate("/signin");
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
