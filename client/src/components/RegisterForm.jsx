import { Link } from "react-router-dom";
import "./AuthForm.css";

export default function RegisterForm() {
  return (
    <div className="auth-page">
      <div className="auth-page__bg" />
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="auth-form__title">Create account</h2>
        <input type="text" placeholder="Full name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign up</button>
        <p className="auth-form__switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}