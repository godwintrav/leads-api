import instance from "@/lib/instance";
import { LOGIN, SIGN_UP } from "../endpoints/auth";

interface Payload {
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    access_token: string;
    token_type: string;
  };
}

export const signUp = (payload: Payload) => {
  return instance.post(SIGN_UP, payload);
};
export const login = (payload: Payload): Promise<AuthResponse> => {
  return instance.post(LOGIN, payload);
};
