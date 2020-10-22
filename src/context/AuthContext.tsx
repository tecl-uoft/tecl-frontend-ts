import React, { createContext, useContext, useEffect, useState } from "react";
import { ICreateStudyProps } from "../services/StudyService";

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
  addCreatedStudyToUser(createdStudy: ICreateStudyProps): void;
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
        throw err;
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

  function addCreatedStudyToUser(createdStudy: ICreateStudyProps): void {
    if (authState.isAuthenticated && authState.user) {
      setAuthState({
        ...authState,
        user: {
          ...authState.user,
          studies: [...authState.user.studies, createdStudy],
        },
      });
    }
    return;
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
    addCreatedStudyToUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
