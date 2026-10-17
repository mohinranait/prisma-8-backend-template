import type { Request, Response } from "express";
import { UserService } from "./user.service.ts";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    const newUser = await UserService.createUser({ email, username, name });
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating user.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching users.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided.",
      });
    }

    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching user.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided.",
      });
    }

    const existingUser = await UserService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found.`,
      });
    }

    const { email, username, name } = req.body;
    const updatedUser = await UserService.updateUser(id, {
      ...(email !== undefined && { email }),
      ...(username !== undefined && { username }),
      ...(name !== undefined && { name }),
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating user.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided.",
      });
    }

    const existingUser = await UserService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found.`,
      });
    }

    const deletedUser = await UserService.deleteUser(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (error) {
    // error here
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting user.",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
