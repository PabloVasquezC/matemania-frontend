export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    role: 'user' | 'admin';
    profilePicture?: string; // Optional field for user profile picture
}