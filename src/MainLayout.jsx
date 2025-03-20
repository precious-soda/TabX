import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ services, setServices }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar services={services} setServices={setServices} />
      <main className="flex-1 flex justify-center p-4 pt-16 md:pt-4">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;