import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ServiceContainer = ({ services }) => {
  const { serviceName } = useParams();
  const [mountedServices, setMountedServices] = useState({});
  const [frameError, setFrameError] = useState(false);

  useEffect(() => {
    if (serviceName && !mountedServices[serviceName]) {
      setMountedServices((prev) => ({ ...prev, [serviceName]: true }));
    }
  }, [serviceName, mountedServices]);

  const getIframeSrc = (url) => {
    // Use proxy for Grafana (port 3000), direct URL for InfluxDB (port 8086)
    if (url.includes("3000")) {
      return `http://localhost:4000?url=${encodeURIComponent(url)}`;
    }
    return url; // Direct URL for InfluxDB or other services
  };

  return (
    <div className="w-full h-full flex flex-col">
      {services.map((service) => (
        <div
          key={service.name}
          style={{
            display: service.name === serviceName ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
          className="flex-1"
        >
          {mountedServices[service.name] && (
            <div className="flex-1 w-full h-full">
              {frameError ? (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    This service cannot be displayed in an iframe.
                  </h2>
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Open in a new tab
                  </a>
                </div>
              ) : (
                <iframe
                  src={getIframeSrc(service.url)}
                  title={service.name}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  onError={() => setFrameError(true)}
                  onLoad={() => console.log(`Iframe loaded: ${service.name}`)}
                />
              )}
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