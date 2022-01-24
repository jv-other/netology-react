import { createContext } from "react";

/**
 * Контекст профиля пользователя
 * @constant
 */
const ProfileContext = createContext({
  profile: null
});

export default ProfileContext;