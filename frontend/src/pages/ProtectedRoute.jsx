import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/signin"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }

    setIsChecking(false); // Stop showing blank screen after check
  }, [navigate]);

  // Optionally show a loading screen while checking auth
  if (isChecking) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
