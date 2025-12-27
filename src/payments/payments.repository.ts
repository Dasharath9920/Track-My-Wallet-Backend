import { Inject } from "@nestjs/common";
import { Kysely, sql } from "kysely";
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

  upcomingPayments = async (userId: string) => {
    const records = await this.client
      .selectFrom('payment')
      .where('user_id', '=', userId)
      .where(sql<boolean>`
      (
        CASE
          WHEN make_date(
            EXTRACT(YEAR FROM CURRENT_DATE)::int,
            EXTRACT(MONTH FROM CURRENT_DATE)::int,
            EXTRACT(DAY FROM due_date)::int
          ) < CURRENT_DATE
          THEN make_date(
            EXTRACT(YEAR FROM CURRENT_DATE)::int,
            EXTRACT(MONTH FROM CURRENT_DATE)::int,
            EXTRACT(DAY FROM due_date)::int
          ) + INTERVAL '1 month'
          ELSE make_date(
            EXTRACT(YEAR FROM CURRENT_DATE)::int,
            EXTRACT(MONTH FROM CURRENT_DATE)::int,
            EXTRACT(DAY FROM due_date)::int
          )
        END
      )
      BETWEEN CURRENT_DATE
      AND CURRENT_DATE + INTERVAL '10 days'
    `)
      .selectAll()
      .orderBy('due_date')
      .execute();

    return records;
  }
}