import { Inject } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "src/database/database.module";
import { DB } from "src/database/types";
import { CreatePaymentRequest } from "./dto/create-payment.dto";

export class PaymentRepository {
  constructor(
    @Inject(KYSELY) private readonly client: Kysely<DB>
  ) { }

  createPayment = async (payment: CreatePaymentRequest) => {
    const { user_id, name, totalMonths, monthsRemaining, amount, dueDate } = payment;
    const record = await this.client
      .insertInto('payment')
      .values({
        user_id,
        name,
        total_months: totalMonths,
        months_remaining: monthsRemaining,
        amount: amount,
        due_date: dueDate
      })
      .returningAll()
      .execute();
    return record;
  }

  getAllPayments = async (userId: string) => {
    const records = await this.client
      .selectFrom('payment')
      .selectAll()
      .where('user_id', '=', userId)
      .orderBy('due_date', 'asc')
      .execute();

    return records;
  }
}