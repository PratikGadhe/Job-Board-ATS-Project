import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../services/api";

function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("employer/applications/");
      setApplications(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    setUpdatingId(appId);
    try {
      await API.post(`applications/${appId}/update_status/`, {
        status: newStatus
      });
      alert("Status updated successfully! ✅");
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status ❌");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: "#6c757d",
      screening: "#ffa500",
      interview: "#007bff",
      selected: "#28a745",
      rejected: "#dc3545"
    };
    return colors[status] || "#6c757d";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employer Dashboard</h2>
      <p>Welcome, <strong>{user?.email}</strong></p>

      <hr />

      <h3>Applicant Management</h3>

      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={fetchApplications}>Retry</button>
        </div>
      ) : applications.length === 0 ? (
        <p>No applications yet. <Link to="/post-job">Post a job</Link> to start receiving applications.</p>
      ) : (
        <div>
          <p>Total Applications: <strong>{applications.length}</strong></p>
          
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            marginTop: "20px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Candidate</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Job Title</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Applied Date</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {app.candidate?.email || `Candidate #${app.candidate}`}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {app.job?.title || "N/A"}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {formatDate(app.applied_at)}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <span style={{
                      padding: "5px 10px",
                      backgroundColor: getStatusColor(app.status),
                      color: "white",
                      borderRadius: "3px",
                      textTransform: "capitalize"
                    }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <select 
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      disabled={updatingId === app.id}
                      style={{
                        padding: "5px",
                        marginRight: "10px",
                        cursor: "pointer"
                      }}
                    >
                      <option value="applied">Applied</option>
                      <option value="screening">Screening</option>
                      <option value="interview">Interview</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {updatingId === app.id && <span>Updating...</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
