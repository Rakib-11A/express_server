import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login first.',
            });
        }

        const secret = process.env.JWT_SECRET || "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
        const decoded = jwt.verify(token, secret);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'Token verification failed';
        
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: message,
        });
    }
};
