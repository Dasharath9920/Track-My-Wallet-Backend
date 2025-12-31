import { Inject, Injectable } from "@nestjs/common";
import { Kysely, sql } from "kysely";
import { KYSELY } from "src/database/database.module";
import { DB } from "src/database/types";
import { CreateTransactionRequest } from "./dto/create-transaction.dto";

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject(KYSELY) private readonly client: Kysely<DB>,
  ) { }

  createTransaction = async (transaction: CreateTransactionRequest) => {
    const { user_id, category, customCategory, amount, date_of_transaction } = transaction;

    const existing = await this.client
      .selectFrom('transaction')
      .selectAll()
      .where('user_id', '=', user_id)
      .where('date_of_transaction', '=', date_of_transaction)
      .where('category', '=', category)
      .executeTakeFirst();

    if (existing) {
      return await this.client
        .updateTable('transaction')
        .set({
          amount: sql`amount + ${amount}`,
          updated_at: sql`now()`
        })
        .where('id', '=', existing.id)
        .returningAll()
        .executeTakeFirst()
    }

    return await this.client
      .insertInto('transaction')
      .values({
        user_id: user_id,
        category,
        custom_category: customCategory ?? '',
        amount,
        date_of_transaction,
      })
      .returningAll()
      .execute();
  }

  deleteTransaction = async (id: string, userId: string) => {
    await this.client
      .deleteFrom('transaction')
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .execute();
  }

  getAllTransactions = async (userId: string) => {
    const records = await this.client
      .selectFrom('transaction')
      .selectAll()
      .where('user_id', '=', userId)
      .orderBy('date_of_transaction', 'desc')
      .execute();
    return records;
  }

  getNDaysTransactions = async (userId: string, days: number) => {
    const since = new Date();
    since.setDate(since.getDate() - (days - 1))
    const records = await this.client
      .selectFrom('transaction')
      .selectAll()
      .where('user_id', '=', userId)
      .where('date_of_transaction', '>=', since)
      .orderBy('date_of_transaction', 'desc')
      .execute();
    return records;
  }

  getNDaysTransactionsGroupByDate = async (userId: string, days: number) => {
    const since = new Date();
    since.setDate(since.getDate() - (days - 1));
    const records = await this.client
      .selectFrom('transaction')
      .where('user_id', '=', userId)
      .where('date_of_transaction', '>=', since)
      .select((eb) => [
        sql<string>`to_char(date_of_transaction, 'DD-MM-YYYY')`.as('day'),
        eb.fn.sum<number>('amount').as('amount'),
      ])
      .groupBy('date_of_transaction')
      .orderBy('date_of_transaction', 'asc')
      .execute();
    return records;
  }
}