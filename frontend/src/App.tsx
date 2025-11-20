import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/components/pages/dashboard";
import ProfileForm from "@/components/pages/profileForm";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;