import { createZodDto } from "@anatine/zod-nestjs";
import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
}).strict();

export class UserCreateRequest extends createZodDto(createUserSchema) { }

export const updateUserSchema = z.object({
  id: z.string(),
  user: createUserSchema.partial(),
}).strict();

export class UserUpdateRequest extends createZodDto(updateUserSchema) { }

export const createUserResponse = z.object({
  user_id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export class UserCreateResponse extends createZodDto(createUserResponse) { }