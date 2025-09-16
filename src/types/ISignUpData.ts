import type { ILoginData} from "./ILoginData";

export interface SignUpData extends ILoginData {
  email: string;
  avatar?: string; // URL del avatar, opcional
}