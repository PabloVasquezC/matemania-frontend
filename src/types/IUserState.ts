import type { IUser } from "./IUser";

export 
interface IUserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
}