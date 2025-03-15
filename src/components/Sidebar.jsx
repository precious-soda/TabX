import { Link } from "react-router-dom";

const Sidebar = () => {
  const services = ["Service 1", "Service 2", "Service 3"];

  return (
    <div className="w-64 h-screen bg-gray800 text-white p-4 fixed">
      <h2 className="text-x1 font-bold mb-4">Dashboard</h2>
      <ul>
        {services.map((service, index) => (
          <li key={index} className="mb-2">
            <a
              href={`/service/${service}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {service}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;