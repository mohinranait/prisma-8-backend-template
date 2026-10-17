import { db } from "../../config/db.ts";
import type { ICreateUserInput, IUpdateUserInput } from "./user.interface.ts";

export const createUser = async (payload: ICreateUserInput) => {
  return await db.orm.public.User.create({
    email: payload.email,
    username: payload.username ?? null,
    name: payload.name ?? null,
  });
};

export const getAllUsers = async () => {
  return await db.orm.public.User.all();
};

export const getUserById = async (id: number) => {
  return await db.orm.public.User.where({ id }).first();
};

export const getUserByEmail = async (email: string) => {
  return await db.orm.public.User.where({ email }).first();
};

export const updateUser = async (id: number, payload: IUpdateUserInput) => {
  return await db.orm.public.User.where({ id }).update(payload);
};

export const deleteUser = async (id: number) => {
  return await db.orm.public.User.where({ id }).delete();
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
