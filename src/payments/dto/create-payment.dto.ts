import { createZodDto } from "@anatine/zod-nestjs";
import z from "zod";

export const createPaymentSchema = z.object({
  user_id: z.string(),
  name: z.string().nonempty(),
  totalMonths: z.number().min(1),
  monthsRemaining: z.number(),
  amount: z.number(),
  dueDate: z.date(),
});

export class CreatePaymentRequest extends createZodDto(createPaymentSchema) { }


export class CreatePaymentResponse extends createZodDto(createPaymentSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})) { }
