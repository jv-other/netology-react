import { createContext } from "react";

/**
 * Контекст авторизации
 * @constant
 */
const AuthContext = createContext({
  token: null,
  profile: null
});

export default AuthContext;