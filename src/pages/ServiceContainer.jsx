import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import proxyHints from "./config/proxyServices.json"; // keep this!

const ServiceContainer = ({ services }) => {
  const { serviceName } = useParams();
  const [mountedServices, setMountedServices] = useState({});
  const [frameErrors, setFrameErrors] = useState({});
  const [iframeLoaded, setIframeLoaded] = useState({});
  const [visibleService, setVisibleService] = useState(null);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (serviceName && !mountedServices[serviceName]) {
      setMountedServices((prev) => ({ ...prev, [serviceName]: true }));
    }

    if (serviceName !== visibleService) {
      setFadingOut(true);
      setTimeout(() => {
        setVisibleService(serviceName);
        setFadingOut(false);
      }, 300);
    }
  }, [serviceName, mountedServices, visibleService]);

  const getIframeSrc = (url) => {
    const needsProxy = proxyHints.some((hint) => url.includes(hint));
    return needsProxy
      ? `http://localhost:4000?url=${encodeURIComponent(url)}`
      : url;
  };

  const handleIframeError = (name) => {
    setFrameErrors((prev) => ({ ...prev, [name]: true }));
  };

  const handleIframeLoad = (name) => {
    setIframeLoaded((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {services.map((service) => {
        const isActive = service.name === visibleService;
        const isMounted = mountedServices[service.name];

        return (
          <div
            key={service.name}
            className={`absolute inset-0 transition-opacity duration-300 ${isActive && !fadingOut ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {isMounted && (
              <div className="flex-1 w-full h-full relative">
                {frameErrors[service.name] ? (
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
                  <>
                    {!iframeLoaded[service.name] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                      </div>
                    )}
                    <iframe
                      src={getIframeSrc(service.url)}
                      title={service.name}
                      className={`w-full h-full border-0 transition-opacity duration-500 ${iframeLoaded[service.name] ? "opacity-100" : "opacity-0"
                        }`}
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      onError={() => handleIframeError(service.name)}
                      onLoad={() => handleIframeLoad(service.name)}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}

      {!services.find((s) => s.name === serviceName) && (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Service Not Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default ServiceContainer;
