import { useParams } from "react-router-dom";

const Service = () => {
  const { serviceName } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{serviceName}</h2>
      <div className="w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
        <iframe
          src="http://localhost:8081/markdown"
          className="w-full h-full border-0"
          title={`${serviceName} content`}
        />
      </div>
    </div>
  );
};

export default Service;