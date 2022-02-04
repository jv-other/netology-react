import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../store/authSlice";
import { complete } from "../store/requestsSlice";
import apiRequestThunk from "../thunks/apiRequestThunk";

/**
 * Форма ввода логина и пароля
 * @component
 * 
 */
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", password: "" });

  const handleChange = ({ target }) => setForm(
    prevForm => ({ ...prevForm, [target.name]: target.value })
  );
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { login, password } = form;
    dispatch(apiRequestThunk("auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    }))
  };

  const { status, data, errorMessage } = useSelector(state => state.requests.auth || {});

  useEffect(() => {
    if ("success" === status) {
      dispatch(auth(data));
      dispatch(complete("auth"))
      navigate("/news", { replace: true });
    };
  }, [status])

  return (
    <form className="row gx-2" onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="col-auto">
          <span className="form-control bg-transparent border-0 text-danger">{errorMessage}!</span>
        </div>
      )}
      <div className="col-auto">
        <input
          className={`form-control ${errorMessage ? "is-invalid" : ""}`}
          name="login"
          type="text"
          placeholder="Username"
          required
          value={form.login}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <input
          className={`form-control ${errorMessage ? "is-invalid" : ""}`}
          name="password"
          type="password"
          placeholder="Password"
          required
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