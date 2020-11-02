export interface TeclUserCreateInput {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName?: string;
}

type UserRoles = "PARTICIPANT" | "RA" | "ADMIN";

export interface UserAuthState {
  isAuthenticated: boolean;
  user?: UserState;
}

export interface UserState {
  email: string;
  firstName: string;
  userRoles: UserRoles;
  lastName: string;
  role: string;
  verified: boolean;
}

/**
 * Create an unverified tecl user with a participant role
 */
async function signup(
  user: TeclUserCreateInput
): Promise<UserAuthState | undefined> {
  const response = await fetch(`/api/v1/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    alert(`sign up at ${response}`);
  }
}

export interface TeclUserLoginInput {
  email: string;
  password: string;
}

/**
 * Logs in a verified tecl user with any role
 */
async function login(user: TeclUserLoginInput): Promise<UserState | undefined> {
  try {
    const response = await fetch(`/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const resJson = await response.json();
    return resJson.user as UserState;
  } catch (err) {
    throw err;
  }
}

async function googleLogin() {
  try {
    const response = await fetch(`/api/v1/user/google-login`, {
      method: "GET",
    });
    return response;
  } catch (err) {
    throw err;
  }
}

async function logout() {
  await fetch(`/api/v1/user/logout`, {
    method: "POST"
  });
}

async function fetchAuthUser() {
  const res = await fetch(`/api/v1/user/`, {
    method: "GET",
  });
  if (!res.ok) {
    return null;
  } else {
    const resJson = await res.json();
    return resJson.user;
  }
}

export default {
  fetchAuthUser,
  login,
  googleLogin,
  logout,
  signup,
};
