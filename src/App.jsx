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

const App = () => {
  const [services, setServices] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("services"));
    return stored || [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Initialize default user from .env
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: process.env.REACT_APP_DEFAULT_USERNAME,
          password: process.env.REACT_APP_DEFAULT_PASSWORD,
        })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

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
                setIsAuthenticated={setIsAuthenticated} // Pass setIsAuthenticated
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
              <Navigate to="/login" replace /> // Add replace for consistency
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;