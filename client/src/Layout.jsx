import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="py-4 px-10 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
