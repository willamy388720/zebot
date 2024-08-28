import { api } from "./api";

export async function fetchMessages() {
  try {
    const response = await api.get("/suspicious_messages");

    return response.data;
  } catch (error) {
    throw error;
  }
}
