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

import { useParams } from "react-router-dom";

const ServicePage = ({ services }) => {
  const { serviceName } = useParams();
  const decodedServiceName = decodeURIComponent(serviceName); // Decode service name
  const service = services.find((s) => s.name === decodedServiceName);

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