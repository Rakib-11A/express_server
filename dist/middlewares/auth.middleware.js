"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login first.',
            });
        }
        const secret = process.env.JWT_SECRET || "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'Token verification failed';
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: message,
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map