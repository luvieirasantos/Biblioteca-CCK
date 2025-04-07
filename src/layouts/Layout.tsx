import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
