import { IUser, IUserInput } from "../interfaces/user.interface";
export declare const userServices: {
    createUser: (userData: IUserInput) => Promise<IUserInput>;
    getAllUsers: () => Promise<IUserInput[]>;
    getUserById: (id: number) => Promise<IUserInput>;
    updateUser: (id: number, userData: IUser) => Promise<IUserInput>;
    deleteUser: (id: number) => Promise<boolean>;
};
//# sourceMappingURL=user.service.d.ts.map