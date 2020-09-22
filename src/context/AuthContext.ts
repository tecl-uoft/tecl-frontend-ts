import React, { createContext, useState } from "react";
import { Service, UserAuthState, TeclUserInput } from "../services/UserService";

const AuthContext = createContext({
    isLoggedIn: false,
    user: undefined,
  });

export function AuthProvider() {
  const defaultAuthState: UserAuthState = {
    isLoggedIn: false,
    user: undefined,
  };
  const [auth, setAuth] = useState(defaultAuthState);

  const login = (teclUserInput: TeclUserInput) => {};

  const logout = () => {
    Service.logout();
  };

  const register = () => {};


}
