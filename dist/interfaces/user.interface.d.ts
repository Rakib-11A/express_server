export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    age?: number;
    phone?: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface IUserInput {
    name: string;
    email: string;
    password: string;
    role: string;
    age?: number;
    phone?: string;
    address?: string;
}
//# sourceMappingURL=user.interface.d.ts.map