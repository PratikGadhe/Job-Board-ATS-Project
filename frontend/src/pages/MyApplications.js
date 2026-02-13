import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("applications/");
      setApplications(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#ffa500",
      reviewed: "#007bff",
      shortlisted: "#28a745",
      rejected: "#dc3545",
      accepted: "#28a745"
    };
    return colors[status] || "#6c757d";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <div style={{ padding: "20px" }}><p>Loading applications...</p></div>;
  
  if (error) return (
    <div style={{ padding: "20px" }}>
      <p style={{color: 'red'}}>{error}</p>
      <button onClick={fetchApplications}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <div>
          <p>You haven't applied to any jobs yet.</p>
          <Link to="/jobs">Browse Available Jobs</Link>
        </div>
      ) : (
        <div>
          <p>Total Applications: <strong>{applications.length}</strong></p>
          
          {applications.map((app) => (
            <div key={app.id} style={{ 
              border: "1px solid #ddd", 
              padding: "20px", 
              margin: "15px 0",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9"
            }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{app.job?.title || "N/A"}</h3>
              
              <p style={{ margin: "5px 0" }}>
                <strong>Company:</strong> {app.job?.company?.name || "N/A"}
              </p>
              
              <p style={{ margin: "5px 0" }}>
                <strong>Location:</strong> {app.job?.location || "N/A"}
              </p>
              
              <p style={{ margin: "5px 0" }}>
                <strong>Applied On:</strong> {formatDate(app.applied_at)}
              </p>
              
              <p style={{ margin: "5px 0" }}>
                <strong>Status:</strong> 
                <span style={{ 
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: getStatusColor(app.status),
                  color: "white",
                  borderRadius: "3px",
                  textTransform: "capitalize"
                }}>
                  {app.status}
                </span>
              </p>
              
              {app.notes && (
                <p style={{ margin: "10px 0", fontStyle: "italic" }}>
                  <strong>Notes:</strong> {app.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
