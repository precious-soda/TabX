/*
 * Copyright 2025 Sahil Kumar Jamwal.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ services, setServices, setIsAuthenticated }) => {
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceUrl, setNewServiceUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddService = () => {
    if (newServiceName.trim() !== "" && newServiceUrl.trim() !== "") {
      const newServiceObj = { name: newServiceName, url: newServiceUrl };
      setServices([...services, newServiceObj]);
      setNewServiceName("");
      setNewServiceUrl("");
      setShowInput(false);
      setIsOpen(false);
      navigate(`/service/${encodeURIComponent(newServiceName)}`); // Encode service name
    }
  };

  const handleRemoveService = (serviceName) => {
    const updatedServices = services.filter((service) => service.name !== serviceName);
    setServices(updatedServices);
    if (location.pathname === `/service/${encodeURIComponent(serviceName)}`) { // Encode for comparison
      navigate("/");
    }
  };

  const startEditService = (service) => {
    setEditService(service.name);
    setEditName(service.name);
    setEditUrl(service.url);
    setShowInput(true);
  };

  const handleEditService = () => {
    if (editName.trim() !== "" && editUrl.trim() !== "") {
      const updatedServices = services.map((service) =>
        service.name === editService ? { name: editName, url: editUrl } : service
      );
      setServices(updatedServices);
      if (location.pathname === `/service/${encodeURIComponent(editService)}`) { // Encode for comparison
        navigate(`/service/${encodeURIComponent(editName)}`); // Encode new name
      }
      setShowInput(false);
      setEditService(null);
      setEditName("");
      setEditUrl("");
    }
  };

  const cancelEditService = () => {
    setEditService(null);
    setEditName("");
    setEditUrl("");
    setShowInput(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <>
      <button
        className={`
          focus-visible:bg-token-surface-hover 
          enabled:hover:bg-token-surface-hover disabled:text-token-text-quaternary 
          h-10 rounded-lg px-2 focus-visible:outline-0 no-draggable 
          md:hidden fixed top-4 z-30 transition-all duration-300 ease-in-out
          ${isOpen ? "left-[17rem]" : "left-4"}
        `}
        style={{ color: '#4a6283' }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        data-testid="close-sidebar-button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-xl-heavy"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div
        className={`
          fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col shadow-lg transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-20
        `}
      >
        <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
            TabX
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowInput(true);
                setEditService(null);
                setNewServiceName("");
                setNewServiceUrl("");
              }}
              className="text-white-400 hover:text-white focus:outline-none focus:ring-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-xl-heavy"
              >
                <path
                  d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99999 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="text-white-400 hover:text-white focus:outline-none focus:ring-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-xl-heavy"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 flex justify-center font-semibold text-gray-400 uppercase text-xs tracking-wider">
          Services
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {services.map((service, index) => (
              <li
                key={index} // Use index as key to avoid issues with spaces
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md transition-colors ${location.pathname === `/service/${encodeURIComponent(service.name)}` ? "bg-gray-700" : ""
                  } hover:bg-gray-600`}
              >
                <Link
                  to={`/service/${encodeURIComponent(service.name)}`} // Encode service name
                  className="flex-1 text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    className="justify-center whitespace-nowrap font-medium cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-gray-500 disabled:opacity-50 disabled:cursor-default text-gray-400 hover:bg-gray-700 px-2 py-1 text-xs flex items-center size-8 rounded-md"
                    onClick={() => startEditService(service)}
                    aria-label="Edit"
                    tabIndex={-1}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-[2] text-gray-400"
                    >
                      <path
                        d="M18.25 5.75C16.8693 4.36929 14.6307 4.36929 13.25 5.75L10.125 8.875L5.52404 13.476C4.86236 14.1376 4.45361 15.0104 4.36889 15.9423L4 20.0001L8.0578 19.6311C8.98967 19.5464 9.86234 19.1377 10.524 18.476L18.25 10.75C19.6307 9.36929 19.6307 7.13071 18.25 5.75V5.75Z"
                        stroke="currentColor"
                      />
                      <path d="M12.5 7.5L16.5 11.5" stroke="currentColor" />
                    </svg>
                  </button>
                  <button
                    className="justify-center whitespace-nowrap font-medium cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-gray-500 disabled:opacity-50 disabled:cursor-default text-gray-400 hover:bg-gray-700 px-2 py-1 text-xs flex items-center size-8 rounded-md"
                    onClick={() => handleRemoveService(service.name)}
                    aria-label="Remove"
                    tabIndex={-1}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-[2] text-gray-400"
                    >
                      <path d="M2.99561 7H20.9956" stroke="currentColor" />
                      <path d="M9.99561 11V17M13.9956 11V17" stroke="currentColor" />
                      <path
                        d="M8 6.5L8.68917 4.08792C8.87315 3.44397 9.46173 3 10.1315 3H13.8685C14.5383 3 15.1268 3.44397 15.3108 4.08792L16 6.5"
                        stroke="currentColor"
                      />
                      <path
                        d="M5 7L5.80098 18.2137C5.91312 19.7837 7.21944 21 8.79336 21H15.2066C16.7806 21 18.0869 19.7837 18.199 18.2137L19 7"
                        stroke="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        {showInput && (
          <div className="p-4 border-t border-gray-700 bg-gray-900 flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Service name"
              value={editService ? editName : newServiceName}
              onChange={(e) => (editService ? setEditName(e.target.value) : setNewServiceName(e.target.value))}
              className="p-2 rounded bg-gray-700 text-white focus:outline-none w-full"
              ref={inputRef}
            />
            <input
              type="text"
              placeholder="Full URL (e.g., https://example.com)"
              value={editService ? editUrl : newServiceUrl}
              onChange={(e) => (editService ? setEditUrl(e.target.value) : setNewServiceUrl(e.target.value))}
              className="p-2 rounded bg-gray-700 text-white focus:outline-none w-full"
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={cancelEditService}
                className="text-gray-400 px-2 focus:outline-none focus:ring-0"
              >
                Cancel
              </button>
              <button
                onClick={editService ? handleEditService : handleAddService}
                className="bg-green-500 px-4 py-1 rounded text-white focus:outline-none focus:ring-0"
              >
                {editService ? "Update" : "Done"}
              </button>
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