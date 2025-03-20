import { useState, useEffect } from "react";

const Home = ({ services }) => {
  const [serviceStatuses, setServiceStatuses] = useState({});

  const checkServiceStatus = async (service) => {
    try {
      const response = await fetch("http://localhost:8081/markdown", {
        method: "HEAD",
        mode: "no-cors",
      });
      return { service, status: "Online", error: null };
    } catch (error) {
      return { service, status: "Offline", error: error.message };
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (const service of services) {
        const result = await checkServiceStatus(service);
        statuses[service] = result;
      }
      setServiceStatuses(statuses);
    };

    fetchStatuses();
  }, [services]);

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
          Welcome to the Dashboard
        </h1>
      </div>

      {/* Service Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {services.map((service) => (
          <div
            key={service}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-xs"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {service}
            </h2>
            <div
              className={`w-3 h-3 rounded-full mb-2 ${serviceStatuses[service]?.status === "Online"
                ? "bg-green-500"
                : serviceStatuses[service]?.status === "Offline"
                  ? "bg-red-500"
                  : "bg-gray-400"
                }`}
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Status: {serviceStatuses[service]?.status || "Checking..."}
            </p>
            {serviceStatuses[service]?.error && (
              <p className="text-xs text-red-500 mt-1">
                Error: {serviceStatuses[service].error}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;