import Sidebar from "./components/Sidebar";

const MainLayout = ({ services, setServices, children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen">
      <Sidebar services={services} setServices={setServices} />
      <main className="flex-1 flex flex-col h-full">
        <div className="w-full h-full">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;