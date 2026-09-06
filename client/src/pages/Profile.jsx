import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import "./Profile.css";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        setError("Could not load your profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile editing isn't supported by the backend yet.");
  };

  if (loading) {
    return <div className="profile">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile">{error}</div>;
  }

  return (
    <div className="profile">
      <h1 className="profile__title">My Profile</h1>
      <div className="profile__card">
        <div className="profile__avatar">{getInitials(user.name)}</div>
        <div>
          <p className="profile__name">{user.name}</p>
          <p className="profile__role">
            {user.email} · Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <form className="profile__form" onSubmit={handleSave}>
        <label className="profile__label">
          Full name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="profile__label">
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="profile__label">
          New password
          <input type="password" placeholder="••••••••" disabled />
        </label>
        <button type="submit" className="profile__save-btn">
          Save changes
        </button>
      </form>
    </div>
  );
}