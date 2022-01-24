import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import AuthContext from "./AuthContext";

import withDataLoader from "../utils/withDataLoader";

/**
 * Компонент визуализации профиля
 * @component
 *  
 */
const Profile = ({ data }) => {
  const { handleLogout, profile, setProfile } = useContext(AuthContext);

  useEffect(() => {
    data && setProfile(data);
  }, [data]);

  return (
    <div className="row gx-2">
      <div className="col-auto d-flex flex-column justify-content-center">
        <span className="fs-5 fw-normal">{`Hello, ${profile?.name}`}</span>
      </div>
      <div className="col-auto">
        <img
          src={profile?.avatar}
          alt={profile?.name}
          className="rounded-circle"
        />
      </div>
      <div className="col-auto d-flex flex-column justify-content-center">
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string
  })
};

export default withDataLoader(Profile, () => "private/me");