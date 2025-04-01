import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./pages/Home";
import { useState, useEffect } from "react";

const App = () => {
  const [services, setServices] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("services"));
    return stored || []; // Start empty if no stored services
  });

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout services={services} setServices={setServices} />}>
          <Route path="/" element={<Home services={services} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;