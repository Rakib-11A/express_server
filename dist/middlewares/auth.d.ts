import { NextFunction, Response, Request } from "express";
interface AuthRequest extends Request {
    user?: any;
}
declare const auth: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map