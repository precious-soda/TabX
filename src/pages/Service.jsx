import { useParams } from "react-router-dom";

const Service = () => {
  const { serviceName } = useParams()


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{serviceName}</h2>
      <iframe src="http://localhost:8081/markdown" />
    </div>
  );
};

export default Service;
