import "./authpage.css";
import React, { useState } from "react";
import { login } from '../store/session';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("khufu@egypt.co", "Password1"));
    navigate('/home');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      return setErrors(data);
    }
    navigate('/home');
  };
  return (
    <div className="authwrapper">
      <div className="auth">
        <div className="namelogo">
          <Link to="/">
          <img
            src="https://cdn.discordapp.com/attachments/919391399269515305/932090523496370277/logo-removebg-preview.png"
            alt="logo"
          ></img></Link>
        </div>
        <p> Sign In</p>
        <Link to="/signup">Don't have an account?</Link>
        <ul className="errors-container">
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <form className="loginform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Email"}
            // required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <button>Sign In</button>
          <button onClick={demoLogin}>Guest</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
