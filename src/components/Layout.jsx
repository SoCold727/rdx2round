import { Header } from "./Header";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="w-2/3 mx-auto mt-3 flex flex-col min-h-[98vh]">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
