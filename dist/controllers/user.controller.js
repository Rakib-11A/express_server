"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("../services/user.service");
const createUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.createUser(req.body);
        console.log(result);
        res.status(201).json({
            message: "User added successfully",
            user: result,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        });
    }
};
const getUserById = async (req, res) => {
    // console.log(req.params);
    // const { id } = req.params;
    try {
        const result = await user_service_1.userServices.getUserById(+req.params.id);
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'User retrieved successfully',
                data: result,
            });
        }
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({
            success: false,
            message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is required for update",
            });
        }
        const result = await user_service_1.userServices.updateUser(+req.params.id, req.body);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.deleteUser(+req.params.id);
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: result
            });
        }
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.userControllers = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
//# sourceMappingURL=user.controller.js.map