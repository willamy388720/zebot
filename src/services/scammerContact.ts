import { api } from "./api";

export async function fetchScammerContacts() {
  try {
    const response = await api.get("/contacts");

    return response.data;
  } catch (error) {
    throw error;
  }
}
