/*
Create a React landing page component for a Job Portal.

Requirements:

1. This is the public entry page before login.
2. Display centered content:
   - Title: "Welcome to Job Portal"
   - Subtitle: "Choose how you want to continue"

3. Two buttons:
   - Continue as Candidate
   - Continue as Employer

4. When candidate button clicked:
   navigate to /login with state { role: "candidate" }

5. When employer button clicked:
   navigate to /login with state { role: "employer" }

6. Use React functional component
7. Use useNavigate from react-router-dom
8. Minimal inline styling
9. Center everything vertically and horizontally

Export default component.
*/
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleCandidate = () => {
    navigate("/login", { state: { role: "candidate" } });
  };

  const handleEmployer = () => {
    navigate("/login", { state: { role: "employer" } });
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Job Portal</h1>
      <p>Choose how you want to continue</p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleCandidate}>
          Continue as Candidate
        </button>

        <button style={styles.button} onClick={handleEmployer}>
          Continue as Employer
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px"
  },
  buttonGroup: {
    display: "flex",
    gap: "20px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default LandingPage;
