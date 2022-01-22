import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useStorage from "../utils/useStorage";
import useJsonFetch from "../utils/useJsonFetch";

import AuthContext from "./AuthContext";

const serverUrl = process.env.REACT_APP_SERVER_URL;

/**
 * Провайдер контекста
 * 
 * @component
 * @prop {JSX.Element} children 
 *  
 */
const AuthProvider = ({ children }) => {
  const [token, setToken] = useStorage(localStorage, "token");
  const [profile, setProfile] = useStorage(localStorage, "profile", true);
  const [authError, setAuthError] = useState(null);

  // Аутентификация
  const handleLogin = async (login, password) => {
    await window.fetch([serverUrl, "auth"].join("/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    }).then(response =>
      response.ok
        ? response.json()
        : (async () => {
          throw {
            responseStatus: response.status,
            response: await response.json()
          }
        })())
      .then(data => {
        setToken(data.token);
        setAuthError(null);
      })
      .catch(err => setAuthError(err.response?.message || "Auth failed!"));
  };

  // Выход
  const handleLogout = () => {
    setToken(null);
    setProfile(null);
  };

  // Авторизованный API
  const useApi = ((resource, opts, deps = []) => {
    const [data, loading, error] = useJsonFetch([serverUrl, resource].join("/"), {
      ...opts, headers: { ...opts?.headers, "Authorization": ["Bearer", token].join(" ") }
    }, [token].concat(deps));

    useEffect(() => {
      error && (401 === error.responseStatus) && handleLogout();
    }, [error]);

    return [data, loading, error];
  });

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, useApi, authError, setProfile, token, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export default AuthProvider;