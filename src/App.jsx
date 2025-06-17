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

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./components/Home";
import ServiceContainer from "./components/ServiceContainer";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import defaultServices from "./config/services.json";

const App = () => {
  const [services, setServices] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("services")) || [];
    // Merge default services with stored, avoiding duplicates
    return [
      ...defaultServices.filter(
        (defaultService) => !stored.some((s) => s.name === defaultService.name)
      ),
      ...stored,
    ];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Persist services to localStorage on update
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  // Handle user authentication setup
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const envUsername = import.meta.env.VITE_DEFAULT_USERNAME;
    const envPassword = import.meta.env.VITE_DEFAULT_PASSWORD;

    if (!storedUser || storedUser.password !== envPassword) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: envUsername,
          password: envPassword,
        })
      );
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout
                services={services}
                setServices={setServices}
                setIsAuthenticated={setIsAuthenticated}
              >
                <Routes>
                  <Route path="/" element={<Home services={services} />} />
                  <Route
                    path="/service/:serviceName"
                    element={<ServiceContainer services={services} />}
                  />
                </Routes>
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;