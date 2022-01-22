import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";

/**
 * Форма ввода логина и пароля
 * @component
 * 
 */
const LoginForm = () => {
  const [form, setForm] = useState({ login: "", password: "" });
  const { token, handleLogin, authError } = useContext(AuthContext);

  const handleChange = ({ target }) => setForm(prevForm => ({ ...prevForm, [target.name]: target.value }));
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { login, password } = form;
    handleLogin(login, password);
  };

  return !token && (
    <form className="row gx-2" onSubmit={handleSubmit}>
      {authError && (
        <div className="col-auto">
          <span className="form-control bg-transparent border-0 text-danger">{authError}!</span>
        </div>
      )}
      <div className="col-auto">
        <input
          className={`form-control ${authError ? "is-invalid" : ""}`}
          name="login"
          type="text"
          placeholder="Username"
          value={form.login}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <input
          className={`form-control ${authError ? "is-invalid" : ""}`}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div id="form-login-btn" className="col-auto">
        <button className="btn btn-outline-success">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;