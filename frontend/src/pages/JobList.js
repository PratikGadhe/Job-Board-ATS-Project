import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("jobs/");
      setJobs(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await API.post(`jobs/${jobId}/apply/`);
      alert("Application submitted successfully! ✅");
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.detail || "Failed to apply ❌";
      alert(errorMsg);
    }
  };

  if (loading) return <div><p>Loading jobs...</p></div>;
  
  if (error) return <div><p style={{color: 'red'}}>{error}</p><button onClick={fetchJobs}>Retry</button></div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job.id} style={{ 
              border: "1px solid #ddd", 
              padding: "20px", 
              margin: "15px 0",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9"
            }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{job.title}</h3>
              
              <p style={{ margin: "5px 0" }}>
                <strong>Company:</strong> {job.company?.name || "N/A"}
              </p>
              
              <p style={{ margin: "5px 0" }}>
                <strong>Location:</strong> {job.location}
              </p>
              
              {job.salary && (
                <p style={{ margin: "5px 0" }}>
                  <strong>Salary:</strong> ${job.salary}
                </p>
              )}
              
              {job.job_type && (
                <p style={{ margin: "5px 0" }}>
                  <strong>Type:</strong> {job.job_type}
                </p>
              )}
              
              <p style={{ margin: "10px 0" }}>
                <strong>Description:</strong><br />
                {job.description}
              </p>
              
              {job.requirements && (
                <p style={{ margin: "10px 0" }}>
                  <strong>Requirements:</strong><br />
                  {job.requirements}
                </p>
              )}
              
              <button 
                onClick={() => handleApply(job.id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
