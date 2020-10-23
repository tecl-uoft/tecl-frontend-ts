import React, { createContext, useContext, useEffect, useState } from "react";

import UserService, {
  UserAuthState,
  TeclUserLoginInput,
  TeclUserCreateInput,
} from "../services/UserService";
import { Props } from "./commonTypes";

interface IAuthContext {
  login(teclUserLoginInput: TeclUserLoginInput): void;
  googleLogin(): void;
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

  function login(teclUserLoginInput: TeclUserLoginInput) {
    UserService.login(teclUserLoginInput)
      .then((loggedInUser) => {
        const loggedInAuthState = {
          isAuthenticated: true,
          user: loggedInUser,
        };
        setAuthState(loggedInAuthState);
      })
      .catch((err) => {
        alert(`${err}`);
      });
  }

  const googleLogin = () => {
    UserService.googleLogin()
      .then()
      .catch((err) => {
        alert(err);
      });
  };

  function logout() {
    UserService.logout()
      .then(() => {
        setAuthState(defaultAuthState);
      })
      .catch((err) => {
        alert("Could not log out, recived error: " + err);
      });
  }

  useEffect(() => {
    UserService.fetchAuthUser()
      .then((user) => {
        if (user) {
          setAuthState({ isAuthenticated: true, user });
        }
      })
      .catch((err) => {
        alert(`Could not check session, recived err: ${err}`);
      });
  }, []);

  const register = (user: TeclUserCreateInput) => {
    UserService.signup(user);
  };

  const contextValue = {
    authState,
    login,
    googleLogin,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
