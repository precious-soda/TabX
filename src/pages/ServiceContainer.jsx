import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ServiceContainer = ({ services }) => {
  const { serviceName } = useParams();
  const [mountedServices, setMountedServices] = useState({});

  useEffect(() => {
    if (serviceName && !mountedServices[serviceName]) {
      setMountedServices((prev) => ({ ...prev, [serviceName]: true }));
    }
  }, [serviceName, mountedServices]);

  return (
    <div className="p-6 w-full h-full">
      {services.map((service) => (
        <div
          key={service.name}
          style={{
            display: service.name === serviceName ? "block" : "none",
            height: "100%",
          }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {service.name}
          </h2>
          {mountedServices[service.name] && (
            <iframe
              src={service.url}
              title={service.name}
              className="w-full h-[calc(100vh-8rem)] border-0"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          )}
        </div>
      ))}
      {!services.find((s) => s.name === serviceName) && (
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Service Not Found
        </h2>
      )}
    </div>
  );
};

export default ServiceContainer;