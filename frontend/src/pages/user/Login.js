// File for Login page content

// Hooks
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin.js";
import { Link, useNavigate } from "react-router-dom";
import "./css/auth.css";
import getGoogleOAuthURL from "../../functions/getGoogleUrl.ts";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginSuccess = await login(email, password);
    if (loginSuccess) {
      navigate("/");
    }
  };

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Link to="/user/signup" style={{ textDecoration: 'none', color: 'black' }}>
          <p>No account?</p>
        </Link>
        <button disabled={isLoading}>Login</button>
        <hr />
        {error && <div className="error">{error}</div>}
      </form>

      <a href={getGoogleOAuthURL()}>
        <img src={require("../../assets/google-logo.png")} className="google-login-logo" alt="Google logo" /> Login with Google
      </a>
    </div>
  );
};

export default Login;
