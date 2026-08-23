import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/board", label: "Board", icon: "🗂️" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo-dot" />
        <span>CollabBoard</span>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            <span className="sidebar__icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        <NavLink to="/login" className="sidebar__logout">
          Log out
        </NavLink>
      </div>
    </aside>
  );
}
