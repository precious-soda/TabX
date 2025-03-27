import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Service from "./pages/Service";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import servicesConfig from "../services.json";

const App = () => {
  const [services, setServices] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("services"));
    if (stored && stored.every(s => s.name && s.url && s.url.startsWith("http://localhost"))) {
      return stored;
    }
    localStorage.removeItem("services");
    return servicesConfig;
  });

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout services={services} setServices={setServices} />}>
          <Route path="/" element={<Home services={services} />} />
          <Route path="/services/:serviceName" element={<Service services={services} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;