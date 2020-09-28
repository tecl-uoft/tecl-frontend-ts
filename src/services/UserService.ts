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
async function login(user: TeclUserLoginInput): Promise<UserState> {
  try {
    const response = await fetch(`/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const loggedInUser = await response.json();
    return loggedInUser
  } catch (err) {
    throw err;
  }
}

async function logout() {
  await fetch(`/api/v1/users/logout`);
}

async function fetchAuthUser() {
  const res = await fetch(`/api/v1/user/`);
  if (!res.ok) {
    console.log(res)
    return null;
  } else {
    const user = await res.json();
    return user;
  }
}

export default {
  fetchAuthUser,
  login,
  logout,
  signup,
};
