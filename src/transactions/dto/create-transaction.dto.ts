import { createZodDto } from "@anatine/zod-nestjs";
import z from "zod";
import { string } from "zod/v4";

export const createTransactionSchema = z.object({
  user_id: z.string(),
  category: z.string(),
  customCategory: z.string().optional(),
  amount: z.number().min(1),
  date_of_transaction: z.date(),
}).strict();

export class CreateTransactionRequest extends createZodDto(createTransactionSchema) { };

export const createTransactionResponseSchema = createTransactionSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export class CreateTransactionResponse extends createZodDto(createTransactionResponseSchema) { }