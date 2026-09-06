import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "\u{1F4CA}" },
  { to: "/board", label: "Board", icon: "\u{1F4CB}" },
  { to: "/profile", label: "Profile", icon: "\u{1F464}" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }

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
        <button
          type="button"
          className="sidebar__logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}