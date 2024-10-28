// StateContext.js
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

// Create the StateContext
export const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// ContextProvider component
export const ContextProvider = ({ children }) => {
  const storedUser = Cookies.get("_user");
  const [user, _setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const [token, _setToken] = useState(Cookies.get("_auth"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      Cookies.set("_auth", token, { expires: 0.5 });
    } else {
      Cookies.remove("_auth");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      Cookies.set("_user", JSON.stringify(user), { expires: 0.5 });
    } else {
      Cookies.remove("_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

//These are used for testing
// const [user, _setUser] = useState({
//   role: "ADMIN",
//   user: 1,
// });
// const [token, _setToken] = useState("jadajdad");

// const [user, _setUser] = useState({
//   role: "DOCTOR",
//   user: 1,
// });
// const [token, _setToken] = useState("jadajdad");

// const [user, _setUser] = useState({
//   role: "USER",
//   user: 1,
// });
// const [token, _setToken] = useState("jadajdad");
