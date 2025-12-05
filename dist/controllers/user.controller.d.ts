import { Request, Response } from "express";
export declare const userControllers: {
    createUser: (req: Request, res: Response) => Promise<void>;
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=user.controller.d.ts.map