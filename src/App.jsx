import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Service from "./pages/Service";
import Home from "./pages/Home";
import MarkdownEditor from "../markdown-service/MarkdownEditor";
import { useState, useEffect } from "react";

const App = () => {
  const [services, setServices] = useState(() => {
    return JSON.parse(localStorage.getItem("services")) || ["Service 1", "Service 2"];
  });

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  return (
    <Router>
      <Routes>
        {/* Routes with Sidebar */}
        <Route
          element={<MainLayout services={services} setServices={setServices} />}
        >
          <Route path="/" element={<Home services={services} />} />
          <Route path="/services/:serviceName" element={<Service />} />
        </Route>

        {/* Standalone Route for MarkdownEditor */}
        <Route path="/markdown" element={<MarkdownEditor />} />
      </Routes>
    </Router>
  );
};

export default App;