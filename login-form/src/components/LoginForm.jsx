import { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div>
        <input type="email" className="input" placeholder="Email" />
      </div>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Password"
        />
        <button
          className="password-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button className="btn">Login</button>
      <button className="btn">Sign up</button>
    </>
  );
}

export default LoginForm;
