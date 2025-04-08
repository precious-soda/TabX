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
    <div className="w-full h-full flex flex-col">
      {services.map((service) => (
        <div
          key={service.name}
          style={{
            display: service.name === serviceName ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
            width: "100%"
          }}
          className="flex-1"
        >
          {mountedServices[service.name] && (
            <div className="flex-1 w-full h-full">
              <iframe
                src={service.url}
                title={service.name}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
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