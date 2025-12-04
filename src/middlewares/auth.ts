import { NextFunction, Response, Request } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/env";

interface AuthRequest extends Request {
    user?: any;
}

const auth = (...roles: string[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try{
            const token = req.headers.authorization?.split(' ')[1];
            if(!token){
                return res.status(401).json({
                    success: false,
                    message: "No token provided. Please login first."
                })
            }
        
            const secret = config.jwtSecret || "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
            const decoded = jwt.verify(token, secret) as JwtPayload;
            console.log({decoded})
            req.user = decoded;
            if(roles.length && !roles.includes(decoded.role as string)){
                return res.status(500).json({
                    success: false,
                    error: "Unauthorized!!!"
                })
            }
            next();

        }catch(error){
            console.error(error);
            const message = error instanceof Error ? error.message : String(error);
            res.status(401).json({
                success: false,
                message: "Invalid or expired token",
                error: message
            })
        }
    }
}

export default auth;