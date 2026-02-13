import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function CandidateDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate Dashboard</h2>
      <p>Welcome, <strong>{user?.email}</strong></p>

      <hr />

      <h3>Quick Actions</h3>
      <ul>
        <li><Link to="/jobs">View Available Jobs</Link></li>
        <li><Link to="/my-applications">Track My Applications</Link></li>
      </ul>
    </div>
  );
}

export default CandidateDashboard;
