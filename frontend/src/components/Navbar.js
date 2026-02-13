import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">ATS Job Portal</Link>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>

        {user.role === "candidate" && (
          <>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/my-applications">My Applications</Link>
          </>
        )}

        {user.role === "employer" && (
          <Link to="/post-job">Post Job</Link>
        )}

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
