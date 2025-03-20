import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const services = ["Service1", "Service2", "Service3"];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-4">
        <Outlet /> {/* This is where the child route components will be rendered */}
      </div>
    </div>
  );
};

export default MainLayout;
