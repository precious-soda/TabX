import { useParams } from "react-router-dom";

const ServicePage = ({ services }) => {
  const { serviceName } = useParams();
  const service = services.find((s) => s.name === serviceName);

  if (!service) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Service Not Found</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full">
      <iframe
        src={service.url}
        title={service.name}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default ServicePage;