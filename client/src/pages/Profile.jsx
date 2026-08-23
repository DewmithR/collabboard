import { useState } from "react";
import { mockUser } from "../data/mockData";
import "./Profile.css";
export default function Profile() {
const [name, setName] = useState(mockUser.name);
const [email, setEmail] = useState(mockUser.email);
const handleSave = (e) => {
e.preventDefault();
// No backend yet — this is UI only until M2
alert("Profile changes are not saved yet — backend arrives in M2.");
};
return (
<div className="profile">
<h1 className="profile__title">My Profile</h1>
<div className="profile__card">
<div className="profile__avatar">{mockUser.avatarInitials}</div>
<div>
<p className="profile__name">{mockUser.name}</p>
<p className="profile__role">
{mockUser.role} · Joined {mockUser.joined}
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
</label>
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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