import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function PostJob() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    job_type: "full_time",
    company: ""
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("companies/");
      setCompanies(res.data);
      if (res.data.length > 0) {
        setFormData(prev => ({ ...prev, company: res.data[0].id }));
      }
    } catch (err) {
      console.error("Failed to fetch companies", err);
      alert("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.company) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const jobData = {
        ...formData,
        company_id: formData.company
      };
      delete jobData.company;
      
      console.log("Submitting job data:", jobData);
      const response = await API.post("jobs/", jobData);
      console.log("Response:", response.data);
      alert("Job posted successfully! ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to post job", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = JSON.stringify(err.response?.data) || "Failed to post job ❌";
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: "20px" }}><p>Loading...</p></div>;

  if (companies.length === 0) {
    return (
      <div style={{ padding: "20px", maxWidth: "600px" }}>
        <h2>Post New Job</h2>
        <div style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          padding: "20px",
          borderRadius: "5px",
          marginTop: "20px"
        }}>
          <h3 style={{ marginTop: 0 }}>⚠️ No Company Profile Found</h3>
          <p>You need to create a company profile first before posting jobs.</p>
          <p style={{ marginBottom: 0 }}>
            <strong>Note:</strong> Please contact the administrator to create a company profile for your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Post New Job</h2>
      
      {companies.length === 1 && (
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Posting job for: <strong>{companies[0].name}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Python Developer"
            required
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Company *
          </label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. New York, NY or Remote"
            required
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Job Type *
          </label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. 80000"
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job role, responsibilities, and what you're looking for..."
            required
            rows="5"
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="List the required skills, experience, and qualifications..."
            rows="5"
            style={{ width: "100%", padding: "8px", fontSize: "14px" }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "12px 30px",
            backgroundColor: submitting ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: submitting ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {submitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
