import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CandidateDashboard from "./CandidateDashboard";
import EmployerDashboard from "./EmployerDashboard";

function Dashboard() {
  const { user } = useContext(AuthContext);

  if (user?.role === "employer") {
    return <EmployerDashboard />;
  }

  return <CandidateDashboard />;
}

export default Dashboard;
