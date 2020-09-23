import React, { createContext, useCallback, useState } from "react";

import UserSerivce, {
  UserAuthState,
  TeclUserInput,
  TeclUserCreateInput,
} from "../services/UserService";

interface IAuthContext {
  login(teclUserInput: TeclUserInput): void;
  logout(): void;
  register(user: TeclUserCreateInput): void;
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children = null }) {
  const defaultAuthState: UserAuthState = {
    isAuthenticated: false,
    user: undefined,
  };
  const [teclUser, setTeclUser] = useState(defaultAuthState);

  const login = useCallback(
    (teclUserInput: TeclUserInput) => {
      UserSerivce.login(teclUserInput).then((user) => setTeclUser(user));
    },
    [setTeclUser]
  );

  const logout = () => {
    UserSerivce.logout();
    setTeclUser(defaultAuthState);
  };

  const register = (user: TeclUserCreateInput) => {
    UserSerivce.create(user);
  };

  const contextValue = {
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
