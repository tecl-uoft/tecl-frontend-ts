import React, { createContext, useContext, useEffect, useState } from "react";

import UserService, {
  UserAuthState,
  TeclUserLoginInput,
  TeclUserCreateInput,
} from "../services/UserService";
import { Props } from "./commonTypes";

interface IAuthContext {
  login(teclUserLoginInput: TeclUserLoginInput): Promise<boolean>;
  googleLogin(): void;
  logout(): Promise<void>;
  register(user: TeclUserCreateInput): Promise<void>;
  authState: UserAuthState;
  forgotPassword(email: string): Promise<void>
}
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: Props) {
  const defaultAuthState: UserAuthState = {
    isAuthenticated: false,
    user: undefined,
  };
  const [authState, setAuthState] = useState(defaultAuthState);

  async function register(user: TeclUserCreateInput): Promise<void> {
    UserService.signup(user)
      .then((res) => {
        if (!res) {
          return Promise.reject("Signup failed");
        }
        alert("Signup Successful!");
      })
      .catch(() => {
        alert("Unfortunately, your signup has failed. Please try again.");
      });
  }

  /* Function to login the user, returns true iff login is successful */
  async function login(teclUserLoginInput: TeclUserLoginInput): Promise<boolean> {
    let isSuccess = true
    UserService.login(teclUserLoginInput)
      .then((loggedInUser) => {
        const loggedInAuthState = {
          isAuthenticated: true,
          user: loggedInUser,
        };
        setAuthState(loggedInAuthState);
      })
      .catch((err) => {
        isSuccess = false
        // alert("Incorrect login. Please try again.");
      });
    return isSuccess
  }

  async function forgotPassword(email: string) {
    return
  }

  const googleLogin = () => {
    UserService.googleLogin()
      .then()
      .catch((err) => {
        alert(err);
      });
  };

  async function logout(): Promise<void> {
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

  const contextValue = {
    authState,
    login,
    googleLogin,
    logout,
    register,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
