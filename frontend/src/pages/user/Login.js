// File for Login page content

// Hooks
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import "./css/auth.css"


const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isloading } = useLogin();
  const navigate = useNavigate();
  

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginSuccess = await login(email, password);
    console.log('loginSuccess: ', loginSuccess)
    if (loginSuccess) {
      navigate("/");
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      {/* Form Title*/}
      <h3>Login</h3>

      {/* Email Input*/}
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      {/* Password Input*/}
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <Link to="/signup" style={{ textDecoration: 'none, black' }}><p>no account?</p></Link>

      {/* Submission Button*/}
      <button disabled={isloading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
