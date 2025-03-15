import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ServiceTabs from "./components/ServiceTabs";
import Service from "./pages/Service";
import Home from "./pages/Home";

const App = () => {
  const services = ["Service1", "Service2", "Service3"];

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex-1 p-4">
          <ServiceTabs services={services} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:serviceName" element={<Service />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
