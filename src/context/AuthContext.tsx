import React, { createContext, useCallback, useContext, useState } from "react";

import UserSerivce, {
  UserAuthState,
  TeclUserLoginInput,
  TeclUserCreateInput,
} from "../services/UserService";
import { Props } from "./commonTypes";

interface IAuthContext {
  login(teclUserLoginInput: TeclUserLoginInput): void;
  logout(): void;
  register(user: TeclUserCreateInput): void;
  authState: UserAuthState;
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: Props) {
  const defaultAuthState: UserAuthState = {
    isAuthenticated: false,
    user: undefined,
  };
  const [authState, setAuthState] = useState(defaultAuthState);

  const login = useCallback(
    (teclUserLoginInput: TeclUserLoginInput) => {
      UserSerivce.login(teclUserLoginInput)
        .then((loggedInUser) => {
          const loggedInAuthState = {
            isAuthenticated: true,
            user: loggedInUser,
          };
          setAuthState(loggedInAuthState);
        })
        .catch((err) => {
          throw err;
        });
    },
    [setAuthState]
  );

  const logout = () => {
    UserSerivce.logout();
    setAuthState(defaultAuthState);
  };

  const register = (user: TeclUserCreateInput) => {
    UserSerivce.signup(user);
  };

  const contextValue = {
    authState,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
