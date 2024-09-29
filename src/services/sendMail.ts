import { api } from "./api";

type SendPositiveEmail = {
  maliciousMessage: string;
  maliciousNameContact: string;
  maliciousPhoneNumber: string;
};

export async function sendPositiveEmail({
  maliciousMessage,
  maliciousNameContact,
  maliciousPhoneNumber,
}: SendPositiveEmail) {
  try {
    const response = await api.post("/positive-decision", {
      malicious_message: maliciousMessage,
      malicious_name_contact: maliciousNameContact,
      malicous_phone_number: maliciousPhoneNumber,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

type SendNegativeEmail = {
  maliciousPhoneNumber: string;
};

export async function sendNegativeEmail({
  maliciousPhoneNumber,
}: SendNegativeEmail) {
  try {
    const response = await api.post("/negative-decision", {
      malicous_phone_number: maliciousPhoneNumber,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
