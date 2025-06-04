import { Link } from "react-router-dom";

const Home = ({ services }) => {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
          Welcome to the Dashboard
        </h1>
      </div>
      {services.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Click the button in the sidebar to add a service.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {services.map((service) => (
            <Link
              key={service.name}
              to={`/service/${service.name}`}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-xs hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {service.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;