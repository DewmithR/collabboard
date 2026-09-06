import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "./AuthForm.css";

export default function AuthForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password });
      console.log("Login success:", response);

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page_bg" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Welcome back</h2>

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log in</button>

        <p className="auth-form__switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}