import type { LoginData } from "./ILoginData";

export interface SignUpData extends LoginData {
  email: string;
  avatar?: string; // URL del avatar, opcional
}