export interface TeclUserCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

type UserRoles = "PARTICIPANT" | "RA" | "ADMIN";

export interface UserAuthState {
  isAuthenticated: boolean;
  user?: { email: string; userRoles: UserRoles };
}

/**
 * Create an unverified tecl user with a participant role
 */
export async function create(
  user: TeclUserCreateInput
): Promise<UserAuthState> {
  const request = await fetch(`/api/v1/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!request.ok) {
    const error = await request.json();
    throw error;
  } else {
    const user = await request.json();
    return user;
  }
}

export interface TeclUserInput {
  email: string;
  password: string;
}

/**
 * Logs in a verified tecl user with any role
 */
async function login(user: TeclUserInput) {
  const request = await fetch(`/api/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!request.ok) {
    let error = null;
    if (request.status === 401) {
      error = await request.json();
    } else {
      error = await request.text();
    }
    throw error;
  } else {
    const user = await request.json();
    return user;
  }
}

async function logout() {
  await fetch(`/api/v1/user/logout`);
}

async function fetchAuthUser() {
  const request = await fetch(`/api/v1/user/me`);
  if (!request.ok) {
    return null;
  } else {
    const user = await request.json();
    return user;
  }
}

export default {
  fetchAuthUser,
  login,
  logout,
  create,
};
