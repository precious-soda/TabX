/*
 * Copyright 2025 Sahil Kumar Jamwal.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect } from "react";

const Home = ({ services }) => {
  const [serviceStatuses, setServiceStatuses] = useState({});

  const checkServiceStatus = async (service) => {
    try {
      const response = await fetch(service.url, { method: "HEAD" });
      return { name: service.name, status: "Online", error: null };
    } catch (error) {
      return { name: service.name, status: "Offline", error: error.message };
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (const service of services) {
        const result = await checkServiceStatus(service);
        statuses[service.name] = result;
      }
      setServiceStatuses(statuses);
    };
    fetchStatuses();
  }, [services]);

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
            <div
              key={service.name}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-xs"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {service.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;