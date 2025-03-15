import { useNavigate } from "react-router-dom";

const ServiceTabs = ({ services }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 p-2 bg-gray-200 rounded">
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/")}>
        Home
      </button>
      {services.map((service, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => window.open(`/service/${service}`, "_blank")}
        >
          {service}
        </button>
      ))}
    </div>
  );
};

export default ServiceTabs;
