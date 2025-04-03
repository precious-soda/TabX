import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import ServiceContainer from "./pages/ServiceContainer"; // Updated import
import { useState, useEffect } from "react";

const App = () => {
  const [services, setServices] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("services"));
    return stored || [];
  });

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  return (
    <Router>
      <MainLayout services={services} setServices={setServices}>
        <Routes>
          <Route path="/" element={<Home services={services} />} />
          <Route
            path="/service/:serviceName"
            element={<ServiceContainer services={services} />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;