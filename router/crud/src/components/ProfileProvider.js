import React from "react";
import PropTypes from "prop-types";
import useStorage from "../utils/useStorage";

import ProfileContext from "./ProfileContext";
import generateProfile from "../utils/generateProfile";

/**
 * Провайдер контекста
 * 
 * @component
 * @prop {JSX.Element} children 
 *  
 */
const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useStorage(localStorage, "profile");

  !profile && setProfile(generateProfile());

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node
};

export default ProfileProvider;