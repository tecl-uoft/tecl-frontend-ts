import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import UserService from "../services/UserService";

import UserSerivce, {
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

  const googleLogin = () => {
    UserService.googleLogin()
      .then()
      .catch((err) => {
        alert(err);
      });
  };

  const logout = useCallback(async () => {
    await UserSerivce.logout();
    setAuthState(defaultAuthState);
  }, [setAuthState, defaultAuthState]);

  useEffect(() => {
    UserSerivce.fetchAuthUser()
      .then((user) => {
        if (user) {
          setAuthState({ isAuthenticated: true, user });
        }
      })
      .catch((err) => {
        alert(`Error ${err.code}: ${err.message}`);
        /* console.error(err); */
        /*  logout(); */
      });
    // eslint-disable-next-line
  }, []);

  const register = (user: TeclUserCreateInput) => {
    UserSerivce.signup(user);
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
