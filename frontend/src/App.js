// Set LandingPage as root route "/"
// Keep existing login and dashboards unchanged

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList";
import MyApplications from "./pages/MyApplications";
import PostJob from "./pages/PostJob";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidate-dashboard"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employer-dashboard"
              element={
                <ProtectedRoute requiredRole="employer">
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <JobList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-applications"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <MyApplications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/post-job"
              element={
                <ProtectedRoute requiredRole="employer">
                  <PostJob />
                </ProtectedRoute>
              }
            />

            {/* Fallback to landing page for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
