import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Service from "./pages/Service";
import Home from "./pages/Home";
import MarkdownEditor from "../markdown-service/MarkdownEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceName" element={<Service />} />
        </Route>

        {/* Standalone Route for MarkdownEditor */}
        <Route path="/markdown" element={<MarkdownEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
