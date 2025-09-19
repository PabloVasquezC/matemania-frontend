export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    role: 'user' | 'admin';
    profilePicture?: string; 
    avatar?: string;
}