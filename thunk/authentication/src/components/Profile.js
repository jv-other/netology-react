import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { setProfile, logout } from "../store/authSlice";
import withDataLoader from "../utils/withDataLoader";
import { useNavigate } from "react-router-dom";


/**
 * Компонент визуализации профиля
 * @component
 *  
 */
const Profile = ({ data, status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ("success" === status) && dispatch(setProfile({ profile: data }));
  }, [status]);

  const profile = useSelector(state => state.auth.profile);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
  }),
  status: PropTypes.string
};

export default withDataLoader(Profile, "private/me");