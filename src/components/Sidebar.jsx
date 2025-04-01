import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ services, setServices }) => {
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceUrl, setNewServiceUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddService = () => {
    if (newServiceName.trim() !== "" && newServiceUrl.trim() !== "") {
      const url = newServiceUrl.startsWith("http://") || newServiceUrl.startsWith("https://")
        ? newServiceUrl
        : `http://localhost:${newServiceUrl}`;
      const newServiceObj = { name: newServiceName, url };
      setServices([...services, newServiceObj]);
      setNewServiceName("");
      setNewServiceUrl("");
      setShowInput(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className={`
          md:hidden fixed top-4 z-30 p-2 bg-gray-800 text-white rounded-full shadow-lg 
          hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none 
          focus:ring-2 focus:ring-green-400
          ${isOpen ? 'left-[17rem]' : 'left-4'}
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      <div
        className={`
          fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col shadow-lg transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-20
        `}
      >
        <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
            TabX
          </Link>
          <button onClick={() => setShowInput(true)} className="text-green-400 text-xl hover:text-green-400">+</button>
        </div>
        <div className="p-4 flex justify-center font-semibold text-gray-400 uppercase text-xs tracking-wider">
          Services
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {services.map((service, index) => (
              <li key={index}>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-gray-700 text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{service.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {showInput && (
          <div className="p-4 border-t border-gray-700 bg-gray-900 flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Service name"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white focus:outline-none w-full"
            />
            <input
              type="text"
              placeholder="Port (e.g., 3000) or full URL"
              value={newServiceUrl}
              onChange={(e) => setNewServiceUrl(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white focus:outline-none w-full"
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button onClick={() => setShowInput(false)} className="text-gray-400 px-2">Cancel</button>
              <button onClick={handleAddService} className="bg-green-500 px-4 py-1 rounded text-white">Done</button>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;