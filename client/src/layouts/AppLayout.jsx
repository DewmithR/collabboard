import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <div className="app-layout__bg" />
      <Sidebar />
      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
