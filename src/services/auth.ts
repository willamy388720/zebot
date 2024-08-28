import { api } from "./api";

export const TOKEN_KEY = "@zebot-token";
export const REFRESH_TOKEN_KEY = "@zebot-refresh-token";

export function isAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

type SignInProps = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignInProps) {
  try {
    const response = await api.post("/signin", { email, password });
    localStorage.setItem(TOKEN_KEY, response.data.token);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/users/profile");

    return response.data;
  } catch (error) {
    throw error;
  }
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
  photo_url: string;
  phone_number: string;
};

export async function signUp({
  name,
  email,
  password,
  photo_url,
  phone_number,
}: SignUpProps) {
  try {
    await api.post("/signup", {
      name,
      email,
      password,
      photo_url,
      phone_number,
    });
  } catch (error) {
    throw error;
  }
}

type UpdateUserProps = {
  name: string;
  email: string;
  photo_url: string;
  phone_number: string;
};

export async function updateUser({
  name,
  email,
  photo_url,
  phone_number,
}: UpdateUserProps) {
  try {
    await api.put("/users", {
      name,
      email,
      photo_url,
      phone_number,
    });
  } catch (error) {
    throw error;
  }
}

export async function refreshToken() {
  try {
    const response = await api.patch("/token/refresh");
    localStorage.setItem(TOKEN_KEY, response.data.token);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getQrCode() {
  try {
    const response = await api.post("/start-whatsapp");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export function signOut() {
  localStorage.removeItem(TOKEN_KEY);
}
