import React, { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";

/**
 * Компонент визуализации профиля
 * @component
 *  
 */
const Profile = () => {
  const { token, handleLogout, useApi, profile, setProfile } = useContext(AuthContext);
  const [data, loading] = useApi("private/me");

  useEffect(() => {
    data && setProfile(data);
  }, [data]);

  return token && (loading ? (
    <div className="spinner-border text-primary">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="row gx-2">
      <div className="col-auto d-flex flex-column justify-content-center">
        <span className="fs-5 fw-normal">{`Hello, ${profile.name}`}</span>
      </div>
      <div className="col-auto">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="rounded-circle"
        />
      </div>
      <div className="col-auto d-flex flex-column justify-content-center">
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  ));
};

export default Profile;