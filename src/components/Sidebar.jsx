import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [services, setServices] = useState(() => {
    return JSON.parse(localStorage.getItem("services")) || ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5"];
  });
  const [newService, setNewService] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  const handleAddService = () => {
    if (newService.trim() !== "") {
      setServices([...services, newService]);
      setNewService("");
      setShowInput(false);
    }
  };

  return (
    <div className="w-60 h-screen bg-gray-800 text-white flex flex-col shadow-lg">
      <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          TabX
        </Link>
        <button onClick={() => setShowInput(true)} className="text-green-400 text-xl">+</button>
      </div>

      <div className="p-4 flex justify-center font-semibold text-gray-400 uppercase text-xs tracking-wider">
        Services
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {services.map((service, index) => (
            <li key={index}>
              <Link to={`/services/${encodeURIComponent(service)}`} className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-gray-700 text-gray-300">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-3"></span>
                <span>{service}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {showInput && (
        <div className="p-4 border-t border-gray-700 bg-gray-900 flex flex-col">
          <input
            type="text"
            placeholder="Enter service name"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <div className="flex justify-end mt-2">
            <button onClick={() => setShowInput(false)} className="text-gray-400 px-2">Cancel</button>
            <button onClick={handleAddService} className="bg-green-500 px-4 py-1 rounded text-white">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
