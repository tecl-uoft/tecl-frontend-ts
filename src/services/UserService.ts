export interface TeclUserInput {
  email: string;
  password: string;
}

type UserRoles = "PARTICIPANT" | "RA" | "ADMIN";

export interface UserAuthState {
  isLoggedIn: boolean;
  user?: { email: string; userRoles: UserRoles };
}

/**
 * Create an unverified tecl user with a participant role
 */
export async function create(user: TeclUserInput): Promise<UserAuthState> {
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


