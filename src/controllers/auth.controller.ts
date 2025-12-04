import { Request, Response } from "express";
import { authServices } from "../services/auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try{
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            })
        }
        const result = await authServices.loginUser(email, password);
        
        if (!result) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: result,
        })
    }catch(error){
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        })
    }

}

export const authControllers = {
    loginUser,
}