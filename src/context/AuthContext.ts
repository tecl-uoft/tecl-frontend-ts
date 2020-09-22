import React, { createContext, useState } from "react";
import { UserAuthState, TeclUserInput } from "../services/UserService";

const AuthContext = createContext(null);

function AuthProvider() {
  const defaultAuthState: UserAuthState = {
    isLoggedIn: false,
    user: undefined,
  };
  const [auth, setAuth] = useState(defaultAuthState);

  const login = (teclUserInput: TeclUserInput) => {};

  const logout = () => {};

  const register = () => {};
}
