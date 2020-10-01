import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

  const logout = useCallback(() => {
    UserSerivce.logout();
    setAuthState(defaultAuthState);
  }, [setAuthState, defaultAuthState]);

  useEffect(() => {
    UserSerivce.fetchAuthUser()
      .then((user) => {
        if (user) {
          login(user);
        }
      })
      .catch((err) => {
        alert(`Error ${err.code}: ${err.message}`)
        /* console.error(err); */
        logout();
      });
  }, [login, logout]);

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
