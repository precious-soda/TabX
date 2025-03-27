import { useParams } from "react-router-dom";

const Service = ({ services }) => {
  const { serviceName } = useParams();
  const service = services.find(s => s.name === serviceName);
  console.log("Service URL in iframe:", service?.url);
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{service.name}</h2>
      <div className="w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
        <iframe
          src={service.url}
          className="w-full h-full border-0"
          title={`${service.name} content`}
        />
      </div>
    </div>
  );
};

export default Service;